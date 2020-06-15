var express = require('express');
var router = express.Router();


const { successObj, failedObj } = require('../lib/responseTypes.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    console.log("trying to get the connection to db");
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

router.get('/getDropDownValues',function (req,res,next){

  try {
    //all info of request will be in req
    // info which you return will in res
    const db = require('../config/db.js')
    
    let sqlQueryForYTDandMoM = `SELECT * FROM Standard_vw`
    let sqlQueryForQoQ = `SELECT * FROM Quarters`
    let sqlQueryForCost = `SELECT * FROM cost`
    Promise.all([
            db.sequelize.query(
              sqlQueryForYTDandMoM,
                  { type: db.sequelize.QueryTypes.SELECT }
              ),
            db.sequelize.query(
              sqlQueryForQoQ,
                  { type: db.sequelize.QueryTypes.SELECT }
              ),
            db.sequelize.query(
              sqlQueryForCost,
                  { type: db.sequelize.QueryTypes.SELECT }
              )
    ]).then(([resultForYTDandMoM, resultForQoQ,resultForCost]) => {
      // console.log("allResults",resultForYTDandMoM,resultForQoQ);
      let preDropDownValuesForYTD =[],
          postDropDownValuesForYTD =[],
          dropDownValuesForMoM = [],
          dropDownValuesForQoQ =[],
          preDropDownValuesForCost = [],
          postDropDownValuesForCost = [];



      resultForYTDandMoM.map(item => {
        if(item.Period_flag == 'Pre'){preDropDownValuesForYTD.push(item.Tonnage_period)}
        if(item.Period_flag == 'Post'){postDropDownValuesForYTD.push(item.Tonnage_period)}
        dropDownValuesForMoM.push(item.Tonnage_period)
      })



      resultForQoQ.map(item => dropDownValuesForQoQ.push(item.Tonnage_period))



      resultForCost.map(item => {
        if(item.Period_flag == 'Pre'){preDropDownValuesForCost.push(item.Tonnage_period)}
        if(item.Period_flag == 'Post'){postDropDownValuesForCost.push(item.Tonnage_period)}
      })



      let selectedType = req.query.timeframesType
      let finalData = {
        preDropDownValuesForCost:preDropDownValuesForCost,
        postDropDownValuesForCost:postDropDownValuesForCost
      }

      if (selectedType === 'YTD') {
          finalData.preDropDownValues = preDropDownValuesForYTD
          finalData.postDropDownValues = postDropDownValuesForYTD

      }
      if (selectedType === 'MoM') {
          finalData.preDropDownValues = dropDownValuesForMoM
          finalData.postDropDownValues = dropDownValuesForMoM

      }
      if (selectedType === 'QoQ') {
          finalData.preDropDownValues = dropDownValuesForQoQ
          finalData.postDropDownValues = dropDownValuesForQoQ

      }



      console.log("pre",preDropDownValuesForYTD,"\npost",postDropDownValuesForYTD,"\nmom",dropDownValuesForMoM,"\nqoq",dropDownValuesForQoQ,"pre cost",preDropDownValuesForCost,"\npost cost",postDropDownValuesForCost);
      successObj.responseData = finalData
      successObj.responseDesc = 'collected dropdown values'
      res.render('components/version_modal_content', {defaultDropdownValues:successObj.responseData, timeframesType:req.query.timeframesType})
    })
  } catch (e) {
    console.log("error in api",e);
    failedObj.responseData = e
    failedObj.responseDesc = e.message
    res.json(failedObj)
  }
})

module.exports = router;
