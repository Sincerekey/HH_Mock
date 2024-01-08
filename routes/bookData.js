const express = require('express')
const router = express.Router()
const getBook = require('../public/js/getBook')

router.get('/', (req, res)=>{
    const searchQuery = req.query
    let searchValue;
    let searchType;
    if (searchQuery.title) {
        searchValue = searchQuery.title;
        searchType = 'title'
    } else if (searchQuery.author) {
        searchValue = searchQuery.author;
        searchType = 'author'
    } else if (searchQuery.isbn) {
        searchValue = searchQuery.isbn;
        searchType = 'isbn'
    } else if (searchQuery.publisher) {
        searchValue = searchQuery.publisher;
        searchType = 'publisher'
    } else if (searchQuery.genre) {
        searchValue = searchQuery.genre;
        searchType = 'genre'
    } else {
        return res.send({
            error: 'Please provide a valid search query!',
        })
    }

    

    getBook(searchValue, searchType, (error, bookReturn) => {
        if (!bookReturn) {
            return res.send({ error: 'No book found!'})
        }
        res.send({
            bookReturn
        })
    })
})



module.exports = router;