var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var express = require('express');
var router = express.Router();
var app = express();
var cor = require('cors');
var shorturl = require('../API/models/Url-model');
mongoose.connect('mongodb://localhost/URL_Shortner',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
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

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.post('/shorturl',async (req,res)=>{
   
  let shortUrl = await shorturl.create({full:req.body.fullurl})
  
    if(shortUrl == null )return res.sendStatus(404);
    else res.send(shortUrl.short);
})
app.get('/:shorturl',async (req,res)=>{
    const shortUrl = await shorturl.findOne({short:req.params.shorturl})
    if(shortUrl == null )return res.sendStatus(404);
    else res.redirect(shortUrl.full);
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
