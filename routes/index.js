var express = require('express');
var router = express.Router();
const database = require('../database')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', function(req,res,next){
  console.log(req.body)
  const user_email = req.body.user_email_address
  const user_password = req.body.user_password
  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const birthday = req.body.birthday
  const username = req.body.username
  if(user_email && user_password){
    // write query
    myQuery = `
     SELECT * From Person
     WHERE email = "${user_email}"
    `
    insertQuery =`
    INSERT INTO Person (first_name, last_name, birthday, user_name, 
      email, password) VALUES ('${first_name}','${last_name}','${birthday}',
      '${username}','${user_email}', '${user_password}')
    `

  database.query(insertQuery, (err, data)=>{
    if(err){
      throw err
    }else{
      database.query(myQuery, (err, data)=>{
        if(err){
          throw err
        }else{
          req.session.user ={
            ID: data[0].Id,
            first_name: data[0].first_name,
            last_name: data[0].last_name,
            user_name: data[0].user_name,
          }
           res.redirect('/home')
        }
      })
    }
  })
  }
})
module.exports = router;