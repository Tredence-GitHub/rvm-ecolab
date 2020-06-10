var express = require('express');
var router = express.Router();


const { successObj, failedObj } = require('../lib/responseTypes.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    const db = require('../config/db.js')
    console.log("trying to connect to db");
    db.sequelize.authenticate()
        .then(function() {
            console.log("Connected to database !!!");

            res.send("Successfully connected to database")
        })
        .catch(function(err) {
            console.log("SOMETHING WENT WRONG", err);
            res.json(err)
        })
        .done();
  } catch (e) {
      console.log("error in default api route",e);
      failedObj.responseDesc = e.message
      failedObj.responseData = e
      res.json(failedObj)
  }
});

router.get('/getDropDownValues', async (req,res) =>{
  try {
    //all info of request will be in req
    // info which you return will in res
    let sqlQueryForYTDandMoM = `SELECT * FROM [${db.config.database}].[dbo].[Standard_vw]`
    let sqlQueryForQoQ = `SELECT * FROM [${db.config.database}].[dbo].[Quarters]`

    Promise.all(
            [db.sequelize.query(
              sqlQueryForYTDandMoM,
                  { type: db.sequelize.QueryTypes.SELECT }
              ),
              db.sequelize.query(
                sqlQueryForQoQ,
                    { type: db.sequelize.QueryTypes.SELECT }
                )]
    ).then(([resultForYTDandMoM, resultForQoQ]) => {
      // console.log("allResults",resultForYTDandMoM,resultForQoQ);
      let preDropDownValuesForYTD =[],
          postDropDownValuesForYTD =[],
          dropDownValuesForMoM = [],
          dropDownValuesForQoQ =[];

      resultForYTDandMoM.map(item => {
        if(item.Period_flag == 'Pre'){preDropDownValuesForYTD.push(item.Tonnage_period)}
        if(item.Period_flag == 'Post'){postDropDownValuesForYTD.push(item.Tonnage_period)}
        dropDownValuesForMoM.push(item.Tonnage_period)
      })
      resultForQoQ.map(item => dropDownValuesForQoQ.push(item.Tonnage_period))

      console.log("pre",preDropDownValuesForYTD,"\npost",postDropDownValuesForYTD,"\nmom",dropDownValuesForMoM,"\nqoq",dropDownValuesForQoQ);
      successObj.responseData = {
        preDropDownValuesForYTD : preDropDownValuesForYTD,
        postDropDownValuesForYTD : postDropDownValuesForYTD,
        dropDownValuesForMoM : dropDownValuesForMoM,
        dropDownValuesForQoQ : dropDownValuesForQoQ
      }
      successObj.responseDesc = 'collected dropdown values'
      res.json(successObj)
    })
  } catch (e) {
    console.log("error in api",e);
    failedObj.responseData = e
    failedObj.responseDesc = e.message
    res.json(failedObj)
  }
})

module.exports = router;
