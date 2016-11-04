//DataBase for storing the Train Details//


var mongoose = require('mongoose');
var schema = mongoose.Schema;
var TrainData =  new schema ({
  destination: String ,
  name:{ type:String , unique:true } ,
  days : Number ,
  class: String ,
  distance: Number  ,
  travel_time:Number//in hours ,
  ,
  reach_time:{ type:Date , default: Date.now } ,
  start_time:{ type:Date , default: Date.now } ,
  source:String,
  type:String
});

//exporting the DB model for
module.exports = mongoose.model('traindetails', TrainData);
//'traindetails' is the name of the train Collection(table in RDBMS)
