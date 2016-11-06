//DataBase for storing the User Details who registers and books tickets//


var mongoose = require('mongoose');
var train = require('../model/trainData.js');
var schema = mongoose.Schema;
var FormData =  new schema ({
   fname:String,
   Lname:String,
   gender:String,
   age:{type:Number , min:18 , max:70},
   occupation:String ,
   pass:{type:String , unique:true},
   email: { type : String , unique:true} ,
   mobile:{type:Number ,unique:true} ,
   country : String ,
   city : String,
   state:String ,
   train_name :String ,
   travel_date :Date,
   people_travelling: String ,
   class:String ,
   from: String ,
   To :String

});

//exporting the DB model for
module.exports = mongoose.model('User', FormData);
//'User' is the name of the collection
