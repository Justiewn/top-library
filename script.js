

const bookcase = document.querySelector("#books");
const newBookDiv = document.querySelector("#new-book-div");
const form = document.querySelector("#form");
const popupDiv = document.querySelector("#popup-div");
const draggable = document.querySelector("#draggable-div");
const cancelButton = document.querySelector("#btn-cancel");
const input = form.elements;


class Book {
    constructor(title, author, pages, read, id=undefined) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id; 
    }
    info() {
        return (`${this.author}
${this.pages} pages`)
    }
    getTitle() {
        return (`${this.title}`)
    }
    getRead() {
        return (`${(this.read) ? "Read":"Not read"}`)
    }
}



class BookCase {
    constructor(myLibrary=[], uniqueID=0) {
        this.myLibrary = myLibrary;
        this.uniqueID = uniqueID;
    }

    addBook(book) {
        this.myLibrary.push(book);
        this.displayBook(book);
        localSave();
    }

    displayBook(book) {
        const newBook = document.createElement('div');
        const newBookTitle = document.createElement('div');
        const newBookInfo = document.createElement('div');
        const newBookRead = document.createElement('div');
        const buttonRemoveBook = document.createElement('button');
    
        newBookTitle.textContent = book.getTitle();
        newBookTitle.style.pointerEvents = "none";
        newBookTitle.style.fontWeight = 'bold';
    
        newBookInfo.textContent = book.info();
        newBookInfo.style.pointerEvents = "none";
    
        newBookRead.textContent = book.getRead();
        newBookRead.classList.add('read-div');
        this.setReadColor(book, newBook);
    
        buttonRemoveBook.textContent = '❌';
        buttonRemoveBook.classList.add('btn-remove');
    
        newBook.classList.add('book');
        if (book.id === undefined) {
            newBook.setAttribute("id", `book-${this.uniqueID}`)
            newBook.setAttribute("data-value", `${this.uniqueID}`)
            book.id = this.uniqueID;
            this.uniqueID++;
        } else {
            newBook.setAttribute("id", `book-${book.id}`)
            newBook.setAttribute("data-value", `${book.id}`)
        }
        bookcase.insertBefore(newBook, newBookDiv);
        newBook.appendChild(newBookTitle);
        newBook.appendChild(newBookInfo);
        newBook.appendChild(newBookRead);
        newBook.appendChild(buttonRemoveBook);
    }
    initialDisplay() {
        this.myLibrary.forEach(book => displayBook(book));
    }
    clearForm(formElements) {
        formElements[0].value = "";
        formElements[1].value = "";
        formElements[2].value = "";
        formElements[3].checked = false;
    }

    hideForm(input) {
        this.clearForm(input);
        form.style.visibility = 'hidden';
        popupDiv.setAttribute('style', 'position: inital;');
    }

    displayForm(e) {
        popupDiv.setAttribute('style', `top: ${e.pageY-45}px; left: ${e.pageX-80}px`);
        form.style.visibility = 'visible';
    }

    setReadColor(book, bookDOM) {
        if (book.read) {
            bookDOM.classList.add('book-read');
            bookDOM.classList.remove('book-not-read')

        } else {
            bookDOM.classList.add('book-not-read');
            bookDOM.classList.add('book-read');
        }
    }
}

// Display pop-up 'Add new book' form
newBookDiv.addEventListener('click', (e) => library.displayForm(e))

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-remove")) {
        let bookDomToRemove = e.target.parentNode
        let bookObjectToRemove = library.myLibrary.find(book => book.id == bookDomToRemove.getAttribute("data-value"));
        library.myLibrary = library.myLibrary.filter(book => book !== bookObjectToRemove);
        bookDomToRemove.remove();
        localSave();
    }
})

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("read-div")) {
        let bookDom = e.target.parentNode
        let bookObjectToChange = library.myLibrary.find(book => book.id == bookDom.getAttribute("data-value"));
        bookObjectToChange.read = !bookObjectToChange.read;
        e.target.textContent = bookObjectToChange.getRead();
        library.setReadColor(bookObjectToChange,bookDom);
        localSave();
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    title = input[0].value;
    author = input[1].value;
    pages = input[2].value;
    read = input[3].checked;
    let newBook = new Book(title, author, pages, read)
    library.addBook(newBook);
    library.hideForm(input);
})

cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    library.hideForm(input);
})

// courtesy of W3Schools
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        popupDiv.style.top = (popupDiv.offsetTop - pos2) + "px";
        popupDiv.style.left = (popupDiv.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function localSave() {
    console.log("saved");
    console.log(library.myLibrary);
    localStorage.setItem("uniqueID", library.uniqueID);
    localStorage.setItem("myLibrary", JSON.stringify(library.myLibrary));
    
}

function localRestore() {
    uniqueID = localStorage.getItem("uniqueID");
    myLibraryToRebuild = JSON.parse(localStorage.getItem("myLibrary"));
    if (myLibraryToRebuild === null) {
        console.log('is now a empty array?');
        library.myLibrary = [];
    }
    myLibraryToRebuild.forEach(item => {
        library.addBook(new Book(item.title, item.author, item.pages, item.read, item.id));
    })
}

let library = new BookCase();
localRestore();
dragElement(draggable);

const book1 = new Book("Harry Pooper", "J.K. Roller", 369, false);
const book2 = new Book("Of Mac and Cheese", "M.C. Donald", 144, true);
const book3 = new Book('"Chyna"', "Donald J. Trump", 2, false);

if (library.myLibrary.length == 0) {
    console.log("empty");
    library.addBook(book1);
    library.addBook(book2);
    library.addBook(book3);
}