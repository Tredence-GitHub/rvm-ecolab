var express = require('express');
var router = express.Router();
const db = require('../config/db.js')
const { successObj, failedObj } = require('../lib/responseTypes.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    let sectionType = 'division'
    db.version.findAll({
      where: {viewName : sectionType},
      order: [['requestedDate','desc']]
    }).then(viewData =>{
      successObj.responseData = viewData
      successObj.responseDesc = `Version Data is successfully collected for view - ${sectionType}`
      //res.json(successObj)
      res.render('index', {versionData:successObj.responseData})
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
