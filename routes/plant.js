var express = require('express');
var router = express.Router();
const db = require('../config/db.js')
const { successObj, failedObj } = require('../lib/responseTypes.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
    let sectionType = 'plant'
    db.version.findAll({
      where: {viewName : sectionType}
    }).then(viewData =>{
      successObj.responseData = viewData
      successObj.responseDesc = `Version Data is successfully collected for view - ${sectionType}`
      //res.json(successObj)
      res.render('plant_rvm', {versionData:successObj.responseData})
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

});

module.exports = router;
