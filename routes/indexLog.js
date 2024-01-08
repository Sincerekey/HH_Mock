var express = require('express');
var router = express.Router();
const database = require('../database')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('indexLog', { title: 'Express' });
});

router.post('/login', function(req,res,next){
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

module.exports = router;
