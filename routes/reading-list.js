var express = require('express');
var router = express.Router();
const database = require('../database')


/* GET users listing. */
router.get('/', function(req, res, next) {
    const isbn = req.query.isbn;
    
    const myQuery = `INSERT INTO Library (Person_Id, ISBN) VALUES (${req.session.user.ID}, '${isbn}')`

    database.query(myQuery, function(err, data){
        if(err){
            throw(err)
        }else{
            console.log('Success adding Book')
        }
    })

});

module.exports = router;