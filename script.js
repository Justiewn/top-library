let myLibrary = [];

const bookcase = document.querySelector("#bookcase")

function Book(title, author, pages, read) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return (`${this.title} by ${this.author}, ${this.pages} pages, ${(this.read) ? "read":"not read yet"}`)
}

function addBook(book) {
    myLibrary.push(book);
}

function displayBooks() {
    myLibrary.forEach( book => {
        console.log(book.info());
        const newBook = document.createElement('li');
        newBook.textContent = book.info();
        bookcase.appendChild(newBook);
    })
}


const book1 = new Book("Harry Pooper", "J.K. Roller", 369, false);
const book2 = new Book("Of Mac and Cheese", "M.C. Donald", 144, true);
const book3 = new Book("Count to 2", "Gaben", 2, false);

addBook(book1);
addBook(book2);
addBook(book3);

displayBooks();