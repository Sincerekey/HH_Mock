window.onload = function () { 
    let slides =  
        document.getElementsByClassName('carousel-item'); 
  
    function addActive(slide) { 
        slide.classList.add('active'); 
    } 
  
    function removeActive(slide) { 
        slide.classList.remove('active'); 
    } 
  
    addActive(slides[0]); 
    setInterval(function () { 
        for (let i = 0; i < slides.length; i++) { 
            if (i + 1 == slides.length) { 
                addActive(slides[0]); 
                setTimeout(removeActive, 350, slides[i]); 
                break; 
            } 
            if (slides[i].classList.contains('active')) { 
                setTimeout(removeActive, 350, slides[i]); 
                addActive(slides[i + 1]); 
                break; 
            } 
        } 
    }, 1500); 
};  
const genre = document.getElementById("#subject-select-1").value 




if(genre = "Comics/Graphic-Novel"){
    const subject = "Comics & Graphic Novels"
    function getBookData(search, selector, postList) {
        let url;
    
        switch (selector) {
            case 'Title':
                url = `https://www.googleapis.com/books/v1/volumes?q=${search}+${subject}&key=${APIKEY}&maxResults=40`;
                break;
            case 'author':
                url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:'${search}+${subject}'&key=${APIKEY}&maxResults=40`;
                break;
            case 'publisher':
                url = `https://www.googleapis.com/books/v1/volumes?q=inpublisher:'${search}+${subject}'&key=${APIKEY}&maxResults=40`;
                break;
            // case 'genre':
            //     url = `https://www.googleapis.com/books/v1/volumes?q=subject:'${search}'&key=${APIKEY}&maxResults=40`;
            //     break;
            // case 'ISBN':
            //     url = `https://www.googleapis.com/books/v1/volumes?q=isbn:'${search}'&key=${APIKEY}`;
            //     break;
            default:
                console.error('Invalid selector:', selector);
                return;
        }
    
        fetchBooks(url, postList);
    }

} 

if(genre = "NonFiction"){
    const subject = "Young Adult Fiction"
    function getBookData(search, selector, postList) {
        let url;
    
        switch (selector) {
            case 'Title':
                url = `https://www.googleapis.com/books/v1/volumes?q=${search}+${subject}&key=${APIKEY}&maxResults=40`;
                break;
            case 'author':
                url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:'${search}+${subject}'&key=${APIKEY}&maxResults=40`;
                break;
            case 'publisher':
                url = `https://www.googleapis.com/books/v1/volumes?q=inpublisher:'${search}+${subject}'&key=${APIKEY}&maxResults=40`;
                break;
            // case 'genre':
            //     url = `https://www.googleapis.com/books/v1/volumes?q=subject:'${search}'&key=${APIKEY}&maxResults=40`;
            //     break;
            // case 'ISBN':
            //     url = `https://www.googleapis.com/books/v1/volumes?q=isbn:'${search}'&key=${APIKEY}`;
            //     break;
            default:
                console.error('Invalid selector:', selector);
                return;
        }
    
        fetchBooks(url, postList);
    }

}

if(genre = "Fiction"){
    const subject = "Young Adult Nonfiction"
    function getBookData(search, selector, postList) {
        let url;
    
        switch (selector) {
            case 'Title':
                url = `https://www.googleapis.com/books/v1/volumes?q=${search}+${subject}&key=${APIKEY}&maxResults=40`;
                break;
            case 'author':
                url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:'${search}+${subject}'&key=${APIKEY}&maxResults=40`;
                break;
            case 'publisher':
                url = `https://www.googleapis.com/books/v1/volumes?q=inpublisher:'${search}+${subject}'&key=${APIKEY}&maxResults=40`;
                break;
            // case 'genre':
            //     url = `https://www.googleapis.com/books/v1/volumes?q=subject:'${search}'&key=${APIKEY}&maxResults=40`;
            //     break;
            // case 'ISBN':
            //     url = `https://www.googleapis.com/books/v1/volumes?q=isbn:'${search}'&key=${APIKEY}`;
            //     break;
            default:
                console.error('Invalid selector:', selector);
                return;
        }
    
        fetchBooks(url, postList);
    }

}
