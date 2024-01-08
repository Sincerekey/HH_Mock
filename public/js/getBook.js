const request = require('request');
const APIKEY = 'AIzaSyAr4Whl3injHd6SXT-1FJpfk648WqEy_ro';

getBook = (search, selector, callback) => {
    let url;

    switch (selector) {
        case 'title':
            url = `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${APIKEY}&maxResults=40`;
            break;
        case 'author':
            url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:'${search}'&key=${APIKEY}&maxResults=40`;
            break;
        case 'publisher':
            url = `https://www.googleapis.com/books/v1/volumes?q=inpublisher:'${search}'&key=${APIKEY}&maxResults=40`;
            break;
        case 'genre':
            url = `https://www.googleapis.com/books/v1/volumes?q=subject:'${search}'&key=${APIKEY}&maxResults=40`;
            break;
        case 'isbn':
            url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${search}&key=${APIKEY}`;
            break;
        default:
            console.error('Invalid selector:', selector);
            return;
    }

    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to internet')
        } else if (body.error) {
            callback('Unable to find book title', undefined)
        } else {
            callback(undefined , body.items)
        }
    })
}

module.exports = getBook

