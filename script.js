let myLibrary = [];

const bookcase = document.querySelector("#books");
const newBookDiv = document.querySelector("#new-book-div");
const form = document.querySelector("#form");
const popupDiv = document.querySelector("#popup-div");
const cancelButton = document.querySelector("#btn-cancel");
const input = form.elements;

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
    const buttonRemoveBook = document.createElement('button');

    newBookTitle.textContent = book.getTitle();
    newBookInfo.textContent = book.info();
    buttonRemoveBook.textContent = 'x';
    buttonRemoveBook.classList.add('btn-remove');

    newBookTitle.style.fontWeight = 'bold';

    newBook.classList.add('book');
    newBook.setAttribute("data-value", `${myLibrary.indexOf(book)}`)
    bookcase.insertBefore(newBook, newBookDiv);
    newBook.appendChild(newBookTitle);
    newBook.appendChild(newBookInfo);
    newBook.appendChild(buttonRemoveBook);
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

function hideForm(input) {
    clearForm(input);
    form.style.visibility = 'hidden';
    popupDiv.setAttribute('style', 'position: inital;');
}

newBookDiv.addEventListener('click', (e) => {
    console.log(popupDiv);
    popupDiv.setAttribute('style', `top: ${e.pageY-40}px; left: ${e.pageX-80}px`);
    form.style.visibility = 'visible';
/*     document.addEventListener('click', (e) => {
        if ()
    }) */
})

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-remove")) {
        console.log("hey");
    }
    return;
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    title = input[0].value;
    author = input[1].value;
    pages = input[2].value;
    read = input[3].checked;
    let newBook = new Book(title, author, pages, read)
    addBook(newBook);
    displayBook(newBook);
    hideForm(input);
})

cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    hideForm(input);
})

const book1 = new Book("Harry Pooper", "J.K. Roller", 369, false);
const book2 = new Book("Of Mac and Cheese", "M.C. Donald", 144, true);
const book3 = new Book("A reeeeeeeeally long title for a book", "A reeeeeeally long name like weewoo", 2, false);

addBook(book1);
addBook(book2);
addBook(book3);

initialDisplay();