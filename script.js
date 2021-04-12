function Book(title, author, pages, read) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return (`${title} by ${author}, ${pages} pages, ${(read) ? "read":"not read yet"}`)
    }
}

let book1 = new Book("Harry Pooper", "J.K. Roller", 369, false);

