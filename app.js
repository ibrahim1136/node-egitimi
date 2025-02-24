const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser=require('body-parser');
const indexRouter = require('./routes/user');
const movie = require('./routes/movie');
const director = require('./routes/director');
const mongoose=require("mongoose");
const app = express();
const config=require("./config");
const verifytoken=require(("./middelware/verify-token"))



app.set("api_secret_key",config.api_secret_key);




mongoose.connect("mongodb://localhost/udemy");
mongoose.connection.on("open",()=>{
/*  console.log("mongodb bağlantısı sağlandı");*/
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/movie', movie);
app.use('/api/director', director);
app.use("/api",verifytoken);
// catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error:err.message});
});

module.exports = app;
