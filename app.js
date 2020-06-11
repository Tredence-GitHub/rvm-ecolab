var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv')
dotenv.config()
var indexRouter = require('./routes/index');
var plantRouter = require('./routes/plant');
var apiRouter = require('./routes/apis');


console.log("FFF", process.env.DB_HOST)
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const db = require('./config/db.js');
const PORT = process.env.PORT || 5000

app.use('/', indexRouter);
app.use('/plant_rvm', plantRouter);
app.use('/api', apiRouter);



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
// db.sequelize.authenticate()
//     .then(function() {
//         console.log("Connected to database !!!");
//         app.listen(PORT, () => {
//             console.log('Express listening on port:', PORT);
//         });
//     })
//     .catch(function(err) {
//         console.log("SOMETHING WENT WRONG", err);
//     })
//     .done();

app.listen(PORT, () => {
            console.log('Express listening on port:', PORT);
         });
module.exports = app;
