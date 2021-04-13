let myLibrary = [];

const bookcase = document.querySelector("#books")

function Book(title, author, pages, read) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return (`${this.author}
${this.pages} pages
${(this.read) ? "Read":"Not read"}`)
}

Book.prototype.getTitle = function() {
    return (`${this.title}`)
}

function addBook(book) {
    myLibrary.push(book);
}

function displayBooks() {
    myLibrary.forEach( book => {
        console.log(book.getTitle());
        console.log(book.info());
        const newBook = document.createElement('div');
        const newBookTitle = document.createElement('div');
        const newBookInfo = document.createElement('div');

        newBookTitle.textContent = book.getTitle();
        newBookInfo.textContent = book.info();

        newBookTitle.style.fontWeight = 'bold';

        newBook.classList.add('book');
        bookcase.appendChild(newBook);
        newBook.appendChild(newBookTitle);
        newBook.appendChild(newBookInfo);
    })
}





const book1 = new Book("Harry Pooper", "J.K. Roller", 369, false);
const book2 = new Book("Of Mac and Cheese", "M.C. Donald", 144, true);
const book3 = new Book("A reeeeeeeeally long title for a book", "A reeeeeeally long name like weewoo", 2, false);

addBook(book1);
addBook(book2);
addBook(book3);

displayBooks();