var express = require('express');
var router = express.Router();
const database = require('../database')

/* GET users listing. */
router.get('/', function(req, res, next) {
  const myQuery = `select * from Favorite_books where Person_Id = ${req.session.user.ID}`
    const libraryList = []

    database.query(myQuery, (err, data)=>{
        if(err){
            throw(err)
        }else{
            data.forEach((element)=>{
              console.log(element)
                fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${element.ISBN}&key=AIzaSyAr4Whl3injHd6SXT-1FJpfk648WqEy_ro`)
                .then((data) => data.json())
                .then((data) => { 
                    console.log(data)

                    libraryList.push({
                        title: data.items[0].volumeInfo.title,
                        image: data.items[0].volumeInfo.imageLinks.smallThumbnail
                    })
                

                })
            })
           setTimeout(()=>{
            let bookTitles = [];

            for (let book of libraryList) {
              bookTitles.push(`<section><h1>${book.title}</h1> <img src="${book.image}" /></section>`); 
            }
            
            res.render('favorites', {Books: bookTitles, Name: req.session.user.first_name})
           }, 2000)
        }

    })
    // res.end()
});

module.exports = router;