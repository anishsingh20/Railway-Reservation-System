var express = require('express');
var router = express.Router();
//creating object for DB File in Model
var Userdata = require('../model/Userdata');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/train');
//name of the Database

/* GET home page. */
router.get('/',function(req,res) {
    res.render("home" , {title:'India Railways(IRCTC)' , successMessage:req.flash('successMessage'), errorMessage: req.flash('errorMessage'), msg :req.flash('msg') } );


});


router.get('/signin', function(req, res, next) {
  res.render('index', { title: 'Railway reservation System' });

  //if we don't want to use any view engine then we can simply use res.sendfile('PATH/FILENAME');
});

router.post('/signup',function(req,res){
//stroring Signnup data in mongo Database
var user = {
    fname:req.body.fname,
    Lname:req.body.lname,
    age:req.body.age,
    gender:req.body.gender ,
    occupation:req.body.occupation ,
    email:req.body.email ,
    mobile:req.body.phone ,
    country:req.body.country,
    city:req.body.city,
    state:req.body.state ,
    pass:req.body.password
};

var data = new Userdata(user); //object created via constructor method
data.save(function(err) {
  if(err) {
    console.log(err);
    return res.status(500).send();

  }

  else {
    res.status(200);
    req.flash('successMessage', "You have successfully Signed In ! ");
    res.redirect("/");
  }

});

});




router.get('/getdata',function(req,res) {
  //'GET' request and  endpoint for retriving all the users registered in DB in JSON format
  Userdata.find({},function(err,data){
    if(!err) {
      res.json(data);
    }
    else {
      return res.status(404).send();
    }


  });


});

//login endpoint -- checks if a user is registered in the DB or not//
router.post('/login',function(req,res){
    //stroring user's email and password in these variables
    var email  = req.body.email;
    var password = req.body.pass;

    Userdata.findOne({email:email , pass: password},function(err,user){
      if(err) {
        return res.status(500).send();
      }
      if(!user) {
        req.flash("errorMessage","Not a Registered user!");

        return res.redirect('/');
      }
      else {
        //storing user's data in browser's cookie to maintain a session for the user and authenticate him each time  //
        req.session.user = user ;
        req.flash('success', "You have successfully Logged In ! ");
        return res.redirect('/dashboard');
      }


    });


});

//dashborad route which opens when a user logs in and is authenticated and a session is maintained for the user//
router.get('/dashboard',function(req,res) {
    res.render('dash', {users : req.session.user  , expressFlash: req.flash('success') } );
});

//route for loggin out user and deleting his data from cookie and resetting the session
router.get('/logout',function(req,res){
  req.session.reset();
  req.flash("msg","SuccessFully Logged Out!");
  res.redirect('/');

});


router.get('/search', function(req,res) {


        res.render('search');



});



// router.post('/search',function(req,res) {
//   var fname = req.body.fname;
//
// Userdata.find({ fname:fname },function(err,name) {
// if(err) {
//   res.status(500).send;
// }
// if(!name) {
//   res.status(401).send('<h1>User not found</h1>');
// }
// else {
//   res.send(name);
// }
//
// });
// });









// exporting the routes file for use in other files
module.exports = router;
