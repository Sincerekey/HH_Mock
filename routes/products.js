const express = require('express')
const router = express.Router()
const APIKEY = 'AIzaSyAr4Whl3injHd6SXT-1FJpfk648WqEy_ro';


router.get('/', (req, res) => {
    const searchQuery = req.query.isbn
    
    fetch(`http://localhost:3000/bookdata?isbn=${searchQuery}`)
    .then((response) => response.json())
    .then((response) => { 
        title = response.bookReturn[0].volumeInfo.title
        image = response.bookReturn[0].volumeInfo.imageLinks.thumbnail
        desc = response.bookReturn[0].volumeInfo.description
        
        if (!response.bookReturn[0].volumeInfo.averageRating) {
            rate = 'No Rating Available'
            rateCount = 'No Ratings'
        } else {rate = response.bookReturn[0].volumeInfo.averageRating; rateCount = response.bookReturn[0].volumeInfo.ratingsCount}
        if (!response.bookReturn[0].saleInfo.listPrice) {
            price = 'Price may vary'
            sale = 'Currently unavailable for purchase'
        }
        else {
            price = response.bookReturn[0].saleInfo.listPrice.amount
            sale = response.bookReturn[0].saleInfo.buyLink
        }
        

        res.render('product', {title: title, img: image, description: desc, price: price, sale: sale, rate: rate, rateCount: rateCount})
    })
})

module.exports = router;