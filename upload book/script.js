function uploadBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const originalPrice = document.getElementById("originalPrice").value;
    const discountedPrice = document.getElementById("discountedPrice").value;
    const description = document.getElementById("description").value;
    const brand = document.getElementById("brand").value;
    const tags = document.getElementById("tags").value;
    const coverImageFiles = document.getElementById("coverImage").files;
  
    const bookData = {
        title,
        author,
        originalPrice,
        discountedPrice,
        description,
        brand,
        tags,
    };

    let books = JSON.parse(localStorage.getItem("uploadedBooks")) || [];

    books.push(bookData);

    localStorage.setItem("uploadedBooks", JSON.stringify(books));

    document.getElementById("uploadForm").reset();
}
async function check_perform() { // function to check if there is a book to be edited and if there is, it will fetch the book and fill the form with the book data
    if(localStorage.getItem("ID_Of_book") !== null){
        console.log(localStorage.getItem("ID_Of_book"))
        let data = await get_book(localStorage.getItem("ID_Of_book"));
        console.log(data);
        
        write_book(data);
    }
}


async function get_book(id){
    let url = 'https://e-books-mu.vercel.app/books/get/';
    console.log(url + id);
    try {
        const response = await fetch(url + id);
        const result = await response.json();
        return result.data.book;
    } catch (err) {
        console.log(err);
        return null;
    }
    
}
function write_book(data){
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const originalPrice = document.getElementById("originalPrice");
    const discountedPrice = document.getElementById("discountedPrice");
    const description = document.getElementById("description");
    const brand = document.getElementById("brand");
    const tags = document.getElementById("tags");
    const coverImageFiles = document.getElementById("coverImage");
    title.value = data.title;
    author.value = data.author;
    originalPrice.value = data.originalPrice;
    discountedPrice.value = data.discountedPrice;
    description.value = data.description;
    brand.value = data.brand;
    tags.value = data.tags;
    // coverImageFiles.value = data.coverImage;
    // coverImageFiles.value = data.coverImage;
}
check_perform();
