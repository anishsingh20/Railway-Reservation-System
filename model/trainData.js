//DataBase for storing the Train Details//


var mongoose = require('mongoose');
var schema = mongoose.Schema;
var TrainDataschema =  new schema ({
  destination: String ,
  pnr:{ type:String , unique:true} ,
  name:{ type:String , unique:true } ,
  days : String ,
  class: [{ type:String } ] ,
  distance: String  ,
  travel_time:String//in hours ,
  ,
  reach_time:{ type:String } ,
  start_time:{ type:String} ,
  source:String,
  type:String
});

//exporting the DB model for
module.exports = mongoose.model('traindetails', TrainDataschema);
//'traindetails' is the name of the train Collection(table in RDBMS)
