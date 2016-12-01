var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongoose');

var session =  require('client-sessions');


 var routes = require(path.join(__dirname , 'routes', 'index.js'));
 // var train = require(path.join(__dirname , 'routes', 'train.js'));
 // var routes = require(path.join(__dirname , '/routes'));


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//false ie will only parse string
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  cookieName: 'session',
  secret: 'hahsashskdslkdd',
  duration:2 * 60 * 30 * 2000,  //2 hours duration of session//
  activeDuration: 2000,
}));

app.use('/', routes);
// app.use('/ ',train);





// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      console.log(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
/*
app.listen(5555 ,  function() {
    console.log('App running Successfully, Enjoy!! ');
});
*/
module.exports = app;
