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
              console.log(data)
                fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${element.ISBN}&key=AIzaSyCzIEXYNlt11VX248i6X4Sqnw5xki9izCQ`)
                .then((data) => data.json())
                .then((data) => { 
                    console.log(data)
                    if(data.items){
                    libraryList.push({
                        title: data.items[0].volumeInfo.title,
                        image: data.items[0].volumeInfo.imageLinks.smallThumbnail
                    })
                  }

                })
            })
           setTimeout(()=>{
            let bookTitles = [];

            for (let book of libraryList) {
              bookTitles.push(`<section><h1>${book.title}</h1> <img src="${book.image}" /></section>`); 
            }
            
            res.render('favorites', {Books: bookTitles, Name: req.session.user.first_name})
           }, 1500)
        }

    })
});

module.exports = router;