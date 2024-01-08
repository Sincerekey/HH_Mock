
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
                            listImg.innerHTML = `<a href="p?isbn=${book.volumeInfo.industryIdentifiers[0].identifier}"><img src=${book.volumeInfo.imageLinks.smallThumbnail} /></a>`;
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
                    listImg.innerHTML = `<img src=${book.volumeInfo.imageLinks.smallThumbnail} />`;
                } else {
                    listImg.innerHTML = `<a href="p?isbn=${book.volumeInfo.industryIdentifiers[0].identifier}"><img src=${book.volumeInfo.imageLinks.smallThumbnail} /></a>`;
                }                   let contiRead = document.createElement('button')
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
                perView: 4,
                Autoplay: true,
            };
            new Glide(`${classname}`, config).mount();
        })
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

const APIKEY = 'AIzaSyAr4Whl3injHd6SXT-1FJpfk648WqEy_ro';
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

