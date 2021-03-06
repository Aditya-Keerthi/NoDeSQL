var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createMasterDB = require('./routes/createMasterDB');
var query = require('./routes/query');
var setValues = require('./routes/setValues');
var updateValues = require('./routes/updateValues');
var getDB = require('./routes/getDB');
var cors = require('cors')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/query', query)
app.use('/setValues', setValues)
app.use('/updateValues', updateValues)
app.use('/createMasterDB', createMasterDB)
app.use('/getDB', getDB);

/* GET home page. */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/App.js'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
