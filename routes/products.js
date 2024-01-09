const express = require('express')
const router = express.Router()
// const APIKEY = 'AIzaSyAr4Whl3injHd6SXT-1FJpfk648WqEy_ro';
const APIKEY = 'AIzaSyBEH4iSZbzuRJ6T_IPh1UdoF_1kgWPITh4';


router.get('/', (req, res) => {
    const searchQuery = req.query.isbn
    
    fetch(`http://localhost:3000/bookdata?isbn=${searchQuery}`)
    .then((response) => response.json())
    .then((response) => { 
        let title = response.bookReturn[0].volumeInfo.title
        let image = response.bookReturn[0].volumeInfo.imageLinks.thumbnail
        let desc = response.bookReturn[0].volumeInfo.description
        let publisher = response.bookReturn[0].volumeInfo.publisher
        let date = response.bookReturn[0].volumeInfo.publishedDate
        let lang = response.bookReturn[0].volumeInfo.language
        let authors = "";
        if (!response.bookReturn[0].volumeInfo.authors) {
            authors = 'Unknown'
        } else {
            response.bookReturn[0].volumeInfo.authors.forEach(author => {
                authors += author;
            })
        }
        
        
        if (!response.bookReturn[0].volumeInfo.averageRating) {
            rate = 'No Rating Available'
            rateCount = 'No Ratings'
        } else {rate = response.bookReturn[0].volumeInfo.averageRating; rateCount = response.bookReturn[0].volumeInfo.ratingsCount}
        if (!response.bookReturn[0].saleInfo.listPrice) {
            price = 'Price may vary'
            sale = 'Currently unavailable for purchase'
            saleText = 'Unavailable'
        }
        else {
            price = `$${response.bookReturn[0].saleInfo.listPrice.amount}`
            sale = response.bookReturn[0].saleInfo.buyLink
            saleText = 'Purchase'
        }
        

        res.render('product', {title: title, img: image, description: desc, price: price, sale: sale, saleText: saleText, rate: rate, rateCount: rateCount, authors: authors, publisher: publisher, date: date, lang: lang})
    })
})

module.exports = router;