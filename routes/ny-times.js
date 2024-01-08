const express = require('express');
const router = express.Router();
const axios = require('axios');

const NYT_API_KEY = 'kyAiSHuc87KHVmAvmswaLmFApRAdStmH'; 
const API_ENDPOINT = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${NYT_API_KEY}`;

router.get('/', async (req, res) => {
    
    try {
        const response = await axios.get(API_ENDPOINT);
        const top20Books = response.data.results.books.slice(0, 20).map(book => ({
            title: book.title,
            author: book.author,
            description: book.description,
            book_image: book.book_image,
        }));

        // Renders the bestsellers 
        res.render('bestsellers', { books: top20Books,Name: req.session.user.first_name});
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).render('error', { error: error }); 
    }
});


module.exports = router;
