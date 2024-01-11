var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios');
const database = require('./database')


var indexRouter = require('./routes/index');
// var loginRouter = require('./routes/login.js');
var indexLogRouter = require('./routes/indexLog.js');
var usersRouter = require('./routes/users');
const homeRoute = require('./routes/home.js')
const searchRoute = require('./routes/search.js')
const readList = require('./routes/reading-list.js')
const favList = require('./routes/favorite-list.js')
const libraryRoute = require('./routes/library.js')
const favoriteRoute = require('./routes/favorites.js')
const bookData = require('./routes/bookData.js')
const product = require('./routes/products.js')
const nyTimesRouter = require('./routes/ny-times.js');


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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRoute)
app.use('/search', searchRoute)
app.use('/reading-list', readList)
app.use('/library', libraryRoute)
app.use('/favorite-list', favList)
app.use('/favorites', favoriteRoute)


app.use('/bookdata', bookData)
app.use('/p', product)
app.use('/logging', indexLogRouter)

app.use('/top-20-bestsellers', nyTimesRouter);
app.use('/kids', kidsRoute)



app.use('/landing', landingRoute)

app.use('/loggin', (req, res)=>{
    // console.log(req.body)
    const user_email = req.body.user_email_address
    const user_password = req.body.user_password
  
  
    console.log(user_email)
    console.log(user_password)
    if(user_email && user_password){
      // write query
      myQuery = `
       SELECT * From Person
       WHERE email = "${user_email}"
      `
      
      database.query(myQuery, function(err, data){
        // checking to make sure we have data back
        
        if(data.length>0){
           // Verifying the password
          if(data[0].password === user_password){
            console.log(req.session)
            req.session.user ={
              ID: data[0].Id,
              first_name: data[0].first_name,
              last_name: data[0].last_name,
              user_name: data[0].user_name,
            }
            console.log(req.session)
          res.redirect('/home')
          }else{
            res.send('Incorrect Password Or Username Already In Use')
          }
        }
        
      })
    }
  
  
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

// app.listen(4000, ()=>{
//     console.log('Express is Running')
// })

module.exports = app;
