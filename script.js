let myLibrary = [];

const bookcase = document.querySelector("#books");
const buttonNew = document.querySelector("#btn-new");
const form = document.querySelector("#form");

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

function displayBook(book) {
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
}

function initialDisplay() {
    myLibrary.forEach(book => displayBook(book));
}

function clearForm(formElements) {
    formElements[0].value = "";
    formElements[1].value = "";
    formElements[2].value = "";
    formElements[3].checked = false;
}


buttonNew.addEventListener('click', () => {
    form.style.visibility = 'visible';
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    input = form.elements;
    title = input[0].value;
    author = input[1].value;
    pages = input[2].value;
    read = input[3].checked;
    let newBook = new Book(title, author, pages, read)
    addBook(newBook);
    displayBook(newBook);
    clearForm(input);
    form.style.visibility = 'hidden';
})

const book1 = new Book("Harry Pooper", "J.K. Roller", 369, false);
const book2 = new Book("Of Mac and Cheese", "M.C. Donald", 144, true);
const book3 = new Book("A reeeeeeeeally long title for a book", "A reeeeeeally long name like weewoo", 2, false);

addBook(book1);
addBook(book2);
addBook(book3);

initialDisplay();