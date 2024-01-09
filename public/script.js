const APIKEY = 'AIzaSyCzIEXYNlt11VX248i6X4Sqnw5xki9izCQ';

function fetchBooks(url, postList) {
    fetch(url)
        .then((res) => res.json())
        .then((res) => {
            const fragment = document.createDocumentFragment(); // Create a fragment

            res.items.forEach((book) => {
                let listItem = document.createElement('li');
                if (book.volumeInfo && book.volumeInfo.title) {
                    listItem.textContent = book.volumeInfo.title;
                    let listImg = document.createElement('li');
                    if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail) {
                        if (!book.volumeInfo.industryIdentifiers) {
                            listImg.innerHTML = `<img src=${book.volumeInfo.imageLinks.smallThumbnail} />`;
                        } else {
                            listImg.innerHTML = `<a href="p?isbn=${book.volumeInfo.industryIdentifiers[0].identifier}"><img class='bookload' src=${book.volumeInfo.imageLinks.smallThumbnail} /></a>`;
                        }                        
                        let contiRead = document.createElement('button')
                        let favRead = document.createElement('button')
                        contiRead.innerHTML= '<i class="fa-regular fa-bookmark"></i>'
                        favRead.innerHTML= '<i class="fa-regular fa-heart"></i>'
                        contiRead.className = 'add-to-library';
                        favRead.className = 'add-to-favorite';
                        contiRead.addEventListener('click', function() {
                            const isbn = book.volumeInfo.industryIdentifiers[0].identifier;
                            addToReadingList(isbn);
                            contiRead.innerHTML= '<i class="fa-solid fa-bookmark"></i>'
                        });
                        favRead.addEventListener('click', function() {
                            const isbn = book.volumeInfo.industryIdentifiers[0].identifier;
                            addToFavoriteList(isbn);
                            favRead.innerHTML = '<i class="fa-solid fa-heart"></i>'
                        });
                        listItem.appendChild(listImg)
                        listItem.appendChild(contiRead)
                        listItem.appendChild(favRead)
                    } else {
                        console.error('Missing imageLinks.smallThumbnail:', book);
                    }
                    fragment.appendChild(listItem);
                } else {
                    console.error('Missing volumeInfo.title:', book);
                }
            });

            console.log('Fragment:', fragment);

            postList.innerHTML = ''; // Clear previous content
            postList.appendChild(fragment); // Append the fragment to the postList
        })
        .catch((error) => console.error('Error fetching books:', error));
}




function getBookData(search, selector, postList) {
    let url;

    switch (selector) {
        case 'Title':
            url = `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${APIKEY}&maxResults=10`;
            break;
        case 'author':
            url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:'${search}'&key=${APIKEY}&maxResults=10`;
            break;
        case 'publisher':
            url = `https://www.googleapis.com/books/v1/volumes?q=inpublisher:'${search}'&key=${APIKEY}&maxResults=10`;
            break;
        case 'genre':
            url = `https://www.googleapis.com/books/v1/volumes?q=subject:'${search}'&key=${APIKEY}&maxResults=10`;
            break;
        case 'ISBN':
            url = `https://www.googleapis.com/books/v1/volumes?q=isbn:'${search}'&key=${APIKEY}`;
            break;
        default:
            console.error('Invalid selector:', selector);
            return;
    }

    fetchBooks(url, postList);
}




let contiReadList = []

function topBooks(slideContainer, classname) {
    const subject = subjects[Math.floor(Math.random()*subjects.length)]
    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:'${subject}'&key=${APIKEY}`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res.items[0].volumeInfo.title)
            console.log(res.items)
            res.items.forEach((book)=>{
                let listItem = document.createElement('li');
                listItem.textContent = book.volumeInfo.title;
                let listImg = document.createElement('li');
                if (!book.volumeInfo.industryIdentifiers) {
                    listImg.innerHTML = `<img class='bookload' src=${book.volumeInfo.imageLinks.smallThumbnail} />`;
                } else {
                    listImg.innerHTML = `<a href="p?isbn=${book.volumeInfo.industryIdentifiers[0].identifier}"><img class='bookload' src=${book.volumeInfo.imageLinks.smallThumbnail} /></a>`;
                }                   
                let contiRead = document.createElement('button')
                let favRead = document.createElement('button')
                contiRead.innerHTML= '<i class="fa-regular fa-bookmark"></i>'
                favRead.innerHTML= '<i class="fa-regular fa-heart"></i>'
                contiRead.addEventListener('click', function() {
                    const isbn = book.volumeInfo.industryIdentifiers[0].identifier;
                    addToReadingList(isbn);
                    contiRead.innerHTML= '<i class="fa-solid fa-bookmark"></i>'
                });
                favRead.addEventListener('click', function() {
                    const isbn = book.volumeInfo.industryIdentifiers[0].identifier;
                    addToFavoriteList(isbn);
                    favRead.innerHTML = '<i class="fa-solid fa-heart"></i>'
                });
                listItem.appendChild(listImg)
                listItem.appendChild(contiRead)
                listItem.appendChild(favRead)
                slideContainer.appendChild(listItem)
                listItem.classList.add('glide__slide')
            })
            // Initialize Glide carousel after fetch is completed
            const config = {
                type: 'carousel',
                perView: 4
            };
            new Glide(`${classname}`, config).mount();
        })
}

const NYT_API_KEY = 'kyAiSHuc87KHVmAvmswaLmFApRAdStmH'; 

function nyTopBooks(slideContainer, classname) {
    fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${NYT_API_KEY}`)
        .then((res) => res.json())
        .then((res) => {
            // Iterate over each book in the response
            res.results.books.forEach((book) => {
                // Create a list item for each book
                let listItem = document.createElement('li');

                // Set the text content to the book's title
                listItem.textContent = book.title;

                // Create an img element for the book's image
                let listImg = document.createElement('img');
                // Set the source of the img element
                listImg.src = book.book_image;

                // Create buttons for adding to reading list and favorites
                let contiRead = document.createElement('button');
                let favRead = document.createElement('button');

                // Set inner HTML for both buttons
                contiRead.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
                favRead.innerHTML = '<i class="fa-regular fa-heart"></i>';

                // Add event listeners for both buttons
                contiRead.addEventListener('click', function() {
                    // Use primary_isbn13 from the NYT API
                    const isbn = book.primary_isbn13;
                    addToReadingList(isbn);
                    // Change icon to solid after adding to reading list
                    contiRead.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
                });
                favRead.addEventListener('click', function() {
                    // Use primary_isbn13 from the NYT API
                    const isbn = book.primary_isbn13;
                    addToFavoriteList(isbn);
                    // Change icon to solid after adding to favorites
                    favRead.innerHTML = '<i class="fa-solid fa-heart"></i>';
                });

                // Append the image and buttons to the list item
                listItem.appendChild(listImg);
                listItem.appendChild(contiRead);
                listItem.appendChild(favRead);

                // Append the list item to the container
                listItem.classList.add('ny-img');
                slideContainer.appendChild(listItem);
            });
            // Initialize Glide carousel after fetch is completed
            new Glide(classname, {
                type: 'carousel',
                perView: 4
            }).mount(); //starts the glide functionality 
        })
        .catch((error) => {
            // Log any errors that occur during fetch
            console.error('Error fetching NY Times books:', error);
        });
}


function addToReadingList(isbn) {
    fetch(`/reading-list?isbn=${isbn}`)
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function addToFavoriteList(isbn){
    fetch(`/favorite-list?isbn=${isbn}`)
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    

    // If you want to call getBookData on button click
    document.getElementById('searchButton').addEventListener('click', function() {
        let title = document.getElementById('title');
        let sub = document.getElementById('subject-select');
        getBookData(
            title.value,
            sub.value,
            document.getElementById('postList')
        );
        console.log(title)
        console.log(title.value)
    });
});


