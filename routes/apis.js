var express = require('express');
var router = express.Router();

const db = require('../config/db.js')
const { successObj, failedObj } = require('../lib/responseTypes.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    console.log("trying to get the connection to db");
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
  } catch (error) {
      console.log("error in default api route",error);
      failedObj.responseDesc = error.message
      failedObj.responseData = error
      res.json(failedObj)
  }
});

router.get('/getDropDownValues',function (req,res,next){

  try {
    //all info of request will be in req
    // info which you return will in res

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
      if(req.query.viewType==='standard'){
        res.render('components/version_modal_content_standard', {defaultDropdownValues:successObj.responseData, timeframesType:req.query.timeframesType, viewType:req.query.viewType})
      }
      else if(req.query.viewType==='forecast'){
        res.render('components/version_modal_content_forecast', {defaultDropdownValues:successObj.responseData, timeframesType:req.query.timeframesType, viewType:req.query.viewType})
      }
    })
  } catch (error) {
    console.log("error in api",error);
    failedObj.responseData = error
    failedObj.responseDesc = error.message
    res.json(failedObj)
  }
})

router.post('/saveVersionInfo', (req, res) =>{
  try {
    let versionInfo = req.body
    let versionName = ''
    if (versionInfo.selectedView === 'standard') {
      versionName = `${versionInfo.viewType} - ${versionInfo.priorTonPeriodStd} vs ${versionInfo.curTonPeriodStd} | ${versionInfo.priorCostEstStd} vs ${versionInfo.curCostEstStd}`
    } else {
      versionName = `${versionInfo.priorTonTypeForecast} vs ${versionInfo.curTonTypeForecast}  - ${versionInfo.priorTonPeriodForecast} vs ${versionInfo.curTonPeriodForecast} | ${versionInfo.priorCostEstForecast} vs ${versionInfo.curCostEstForecast}`
    }
    db.version.findOrCreate({
      where : {versionName : versionName, viewName: versionInfo.viewName},
      defaults : versionInfo
    }).spread((versionData, created) =>{
      if (created) {
        successObj.responseData = versionData
        successObj.responseDesc = "A version is successfully registered"
        res.json(successObj)
      } else {
        failedObj.responseDesc = "A version is already registered with these details , you can navigate to version table below and view report as per these details."
        failedObj.responseData = []
        res.json(failedObj)
      }
    })
  } catch (error) {
    console.log("error in api",error);
    failedObj.responseData = error
    failedObj.responseDesc = error.message
    res.json(failedObj)
  }
})

router.get('/getVersionInfo', (req,res) =>{
  try {
    let sectionType = req.query.sectionType
    db.version.findAll({
      where: {viewName : sectionType}
    }).then(viewData =>{
      successObj.responseData = viewData
      successObj.responseDesc = `Version Data is successfully collected for view - ${sectionType}`
      res.json(successObj)
    }).catch(error => {
      console.log("error in api",error);
      failedObj.responseData = error
      failedObj.responseDesc = error.message
      res.json(failedObj)
    })
  } catch (error) {
    console.log("error in api",error);
    failedObj.responseData = error
    failedObj.responseDesc = error.message
    res.json(failedObj)
  }
})
module.exports = router;
