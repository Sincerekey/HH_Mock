  
const genre = document.getElementById("#subject-select-1").value 
switch (genre){
    case 'Comics/Graphic-Novel':
        var subject = "Comics & Graphic Novels"
    function getBookData(search, selector, postList,) {
        let url;
    
        switch (selector) {
            case 'Title':
                url = `https://www.googleapis.com/books/v1/volumes?q=${search}+subject=${subject}&key=${APIKEY}&maxResults=40`;
                break;
            case 'author':
                url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:'${search}+subject=${subject}'&key=${APIKEY}&maxResults=40`;
                break;
            case 'publisher':
                url = `https://www.googleapis.com/books/v1/volumes?q=inpublisher:'${search}+subject=${subject}'&key=${APIKEY}&maxResults=40`;
                break;
            default:
                console.error('Invalid selector:', selector);
                return;
        }
    
        fetchBooks(url, postList);
        
    }
    break;
    case "Fiction":
        var subject = "Young Adult Fiction"
    function getBookData(search, selector, postList) {
        let url;
    
        switch (selector) {
            case 'Title':
                url = `https://www.googleapis.com/books/v1/volumes?q=${search}+subject=${subject}&key=${APIKEY}&maxResults=40`;
                break;
            case 'author':
                url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:'${search}+subject=${subject}'&key=${APIKEY}&maxResults=40`;
                break;
            case 'publisher':
                url = `https://www.googleapis.com/books/v1/volumes?q=inpublisher:'${search}+subject=${subject}'&key=${APIKEY}&maxResults=40`;
                break;
            default:
                console.error('Invalid selector:', selector);
                return;
        }
    
        fetchBooks(url, postList);
    }
    break;
    case "Nonfiction":
        var subject = "Juvenile Nonfiction"
        function getBookData(search, selector, postList) {
            let url;
        
            switch (selector) {
                case 'Title':
                    url = `https://www.googleapis.com/books/v1/volumes?q=${search}+subject=${subject}&key=${APIKEY}&maxResults=40`;
                    break;
                case 'author':
                    url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:'${search}+subject=${subject}'&key=${APIKEY}&maxResults=40`;
                    break;
                case 'publisher':
                    url = `https://www.googleapis.com/books/v1/volumes?q=inpublisher:'${search}+subject=${subject}'&key=${APIKEY}&maxResults=40`;
                    break;
                default:
                    console.error('Invalid selector:', selector);
                    return;
            }
        
            fetchBooks(url, postList);
        }
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