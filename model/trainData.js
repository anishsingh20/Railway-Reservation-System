//DataBase for storing the Train Details//


var mongoose = require('mongoose');
var schema = mongoose.Schema;
var TrainData =  new schema ({








});

//exporting the DB model for
module.exports = mongoose.model('traindetails', TrainData);
//'traindetails' is the name of the train Collection(table in RDBMS)
