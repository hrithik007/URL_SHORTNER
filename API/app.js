var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var express = require('express');
var router = express.Router();
var app = express();
var cor = require('cors');
var shorturl = require('../API/models/Url-model');
const connectDB = require('./DB/Connection');

connectDB().catch(error =>{
  console.log(error);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cor());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/shorturl',async (req,res)=>{
  let shortUrl = new shorturl({full:req.body.fullurl})
  console.log("Saving!!")
   await shortUrl.save()
    
   .then(()=>{ console.log("Inserted!!"); res.send(shortUrl.short)}).catch(error => console.log("ERROR"));
  
})
app.get('/:shortUrl',async (req,res)=>{
   try{ 
    const shortUrl = await shorturl.findOne({ short: req.params.shortUrl })
   
      if(shortUrl == null) return res.sendStatus(404);
      res.redirect(shortUrl.full);
 
  }
  catch{(error)=> console.log(error)};
})
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
