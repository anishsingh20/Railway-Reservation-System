var express = require('express');
var router = express.Router();
//creating Model for User Database
var Userdata = require('../model/Userdata');
var mongoose = require('mongoose');
var train = require('../model/trainData');
mongoose.connect('mongodb://localhost/train');


//name of the Database

/* GET home page. */
router.get('/',function(req,res) {

    res.render('home');

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


        return res.redirect('/');
      }
      else {
        //storing user's data in browser's cookie to maintain a session for the user and authenticate him each time  //
        req.session.user = user ;

        return res.redirect('/dashboard');
      }


    });


});

//dashborad route which opens when a user logs in and is authenticated and a session is maintained for the user//
router.get('/dashboard',function(req,res) {
    res.render('dash', {users : req.session.user});
});

//route for loggin out user and deleting his data from cookie and resetting the session
router.get('/logout',function(req,res){
  req.session.reset();

  res.redirect('/');

});


router.get('/search',function(req,res,next) {

  res.render('searchme');


});

//in 'post' method we parse form's body to access the value of user input data using req.body //
router.post('/search', function(req,res) {


  var fname = req.body.fname;

  //the callback in find function has the response from the server when data is found in DB
  Userdata.findOne({ fname:fname }, function(err,data) {
  if(err) {
  console.log(err);
  return res.status(500).send();
  }
  if(!data) {

  return res.send("User not found");
  }
  else {

        res.render('query', { Data:data});
  }





});

});



//in 'get' method as we know parameters are passed in URL in the form's query so we access it using req.query //
// router.get('/getuser',function(req,res) {
//
//
//   Userdata.findOne({ fname:req.query.fname }, function(err,data) {
//   if(err) {
//   console.log(err);
//   return res.status(500).send();
//   }
//   if(!data) {
//
//   return res.send("User not found");
//   }
//   else {
//
//       res.json(data);
//
//   }
//
//
//
//
//
// });
//
// });

// A get route for retriving train data in angular //
router.get('/traindata',function(req,res) {
    train.find({ },function(err,docs) {
        if(err) {
          res.status(404).send();

        }
        else {
          res.json(docs);
        }
    });
});



//post route to update the user database with the train he selects to book//
router.post('/book',function(req,res) {
    var Train = req.body.train;
    Userdata.update({fname:req.session.user.fname },{ $set: { train_name:Train } },function(err) {
          if(err) {
            return res.status(404).send();
          }

          else {



              res.redirect('/train');


          }
    });
});


//route to book train
router.get('/train',function(req,res) {

    Userdata.findOne({fname:req.session.user.fname},function(err, tname) {
      if(err) {
        res.status(500).send();

      }
      if(!tname) {
        res.status(404).send();
      }
      else {
        return   res.render('booktrain', { users: tname });
      }


    });


});




//getting the details of the booking done by the user and rendering the response send by the server to the view
router.get('/bookingdetails',function(req,res) {

  Userdata.findOne({fname:req.session.user.fname},function(err,train) {
      if(err) {
        res.status(500).send();
      }
      if(!train) {
        res.status(404).send();
      }
      else {
        return res.render('prev', { ticket: train });
      }


  });


});



router.post('/booking',function(req,res){
    var people = req.body.person;
    var date = req.body.date ;
    var Class = req.body.class ;
    var From = req.body.source;
    var  destination = req.body.to;
//updating DB of the user who is having a session and his data in stored in cookies
    Userdata.update({fname:req.session.user.fname}, { $set : { travel_date : date , people_travelling : people , class:Class ,from:From , To:destination }  } , function(err)
    {
        if(err) {
            res.status(404).send();
         }
         else {

           res.redirect('/bookingdetails');
         }
    });
});

























// exporting the routes file for use in other files
module.exports = router;
