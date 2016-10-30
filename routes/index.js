var express = require('express');
var router = express.Router();
//creating object for DB File in Model
var Userdata = require('../model/Userdata');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/train');
//name of the Database

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Railway reservation System' });

  //if we don't want to use any view engine then we can simply use res.sendfile('PATH/FILENAME');
});


// exporting the routes file for use in other files
module.exports = router;
