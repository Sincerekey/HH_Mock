var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const homeRoute = require('./routes/home.js')
const searchRoute = require('./routes/search.js')
const readList = require('./routes/reading-list.js')
const favList = require('./routes/favorite-list.js')
const libraryRoute = require('./routes/library.js')
const favoriteRoute = require('./routes/favorites.js')
const bookData = require('./routes/bookData.js')
const product = require('./routes/products.js')
const landingRoute = require('./routes/landing.js')
const kidsRoute = require('./routes/kids.js')



var app = express();
const session = require('express-session')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'fdfghbvfdfghjhg',
  resave: false,
  saveUninitialized: false,
}))

app.use('/', landingRoute);
app.use('/users', usersRouter);
app.use('/home', homeRoute)
app.use('/search', searchRoute)
app.use('/reading-list', readList)
app.use('/library', libraryRoute)
app.use('/favorite-list', favList)
app.use('/favorites', favoriteRoute)
app.use('/bookdata', bookData)
app.use('/p', product)
app.use('/signUp', indexRouter)
app.use('/kids', kidsRoute)



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

// app.listen(4000, ()=>{
//     console.log('Express is Running')
// })

module.exports = app;
