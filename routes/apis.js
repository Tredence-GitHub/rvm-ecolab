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

    let sqlQueryForYTDandMoM = `SELECT * FROM Standard_vw where view_name = '${req.query.rvmType}'`
    let sqlQueryForQoQ = `SELECT * FROM Quarters where view_name = '${req.query.rvmType}'`
    let sqlQueryForCost = `SELECT * FROM cost where view_name = '${req.query.rvmType}'`
    let sqlQueryForForecast = `SELECT * FROM forecast_vw where view_name = '${req.query.rvmType}'`
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
              ),
            db.sequelize.query(
              sqlQueryForForecast,
                  { type: db.sequelize.QueryTypes.SELECT }
              )
    ]).then(([resultForYTDandMoM, resultForQoQ,resultForCost,resultForForecast]) => {
      // console.log("allResults",resultForYTDandMoM,resultForQoQ);
      let preDropDownValuesForYTD =[],
          postDropDownValuesForYTD =[],
          dropDownValuesForMoM = [],
          dropDownValuesForQoQ =[],
          preDropDownValuesForCost = [],
          postDropDownValuesForCost = [];
          dropDownValuesForForecast = [];



      resultForYTDandMoM.map(item => {
        if(item.period_flag == 'Pre'){preDropDownValuesForYTD.push(item.tonnage_period)}
        if(item.period_flag == 'Post'){postDropDownValuesForYTD.push(item.tonnage_period)}
        dropDownValuesForMoM.push(item.tonnage_period)
      })



      resultForQoQ.map(item => dropDownValuesForQoQ.push(item.fiscal_quarter))



      resultForCost.map(item => {
        preDropDownValuesForCost.push(item.cost_period)
        postDropDownValuesForCost.push(item.cost_period)
      })



      let selectedType = req.query.timeframesType
      let finalData = {
        preDropDownValuesForCost:preDropDownValuesForCost.sort(),
        postDropDownValuesForCost:postDropDownValuesForCost.sort()
      }
      if (req.query.viewType==='standard') {
        if (selectedType === 'YTD') {
            finalData.preDropDownValues = preDropDownValuesForYTD.sort()
            finalData.postDropDownValues = postDropDownValuesForYTD.sort()

        }
        if (selectedType === 'MoM') {
            finalData.preDropDownValues = dropDownValuesForMoM.sort()
            finalData.postDropDownValues = dropDownValuesForMoM.sort()

        }
        if (selectedType === 'QoQ') {
            finalData.preDropDownValues = dropDownValuesForQoQ.sort()
            finalData.postDropDownValues = dropDownValuesForQoQ.sort()

        }
      } else {
        resultForForecast.map( item => dropDownValuesForForecast.push(item.forecast_snapshot_name))
        finalData.preDropDownValues = dropDownValuesForForecast.sort()
        finalData.postDropDownValues = dropDownValuesForForecast.sort()
      }




      // console.log("pre",preDropDownValuesForYTD,"\npost",postDropDownValuesForYTD,"\nmom",dropDownValuesForMoM,"\nqoq",dropDownValuesForQoQ,"pre cost",preDropDownValuesForCost,"\npost cost",postDropDownValuesForCost);
      successObj.responseData = finalData
      successObj.responseDesc = 'collected dropdown values'
      if(req.query.viewType==='standard' && req.query.rvmType==='Division'){
        res.render('components/version_modal_content_standard', {defaultDropdownValues:successObj.responseData, timeframesType:req.query.timeframesType, viewType:req.query.viewType})
      }
      else if(req.query.viewType==='forecast' && req.query.rvmType==='Division'){
        res.render('components/version_modal_content_forecast', {defaultDropdownValues:successObj.responseData, timeframesType:req.query.timeframesType, viewType:req.query.viewType})
      }
      else if(req.query.viewType==='standard' && req.query.rvmType==='Plant'){
        res.render('components/version_modal_content_standard_plant', {defaultDropdownValues:successObj.responseData, timeframesType:req.query.timeframesType, viewType:req.query.viewType})
      }
      else if(req.query.viewType==='forecast' && req.query.rvmType==='Plant'){
        res.render('components/version_modal_content_forecast_plant', {defaultDropdownValues:successObj.responseData, timeframesType:req.query.timeframesType, viewType:req.query.viewType})
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
      where: {viewName : sectionType},
      order: [['requestedDate','desc']]
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
