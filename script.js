// create an empty array
const myLibrary = [];

// create Book constructor
function Book(id, title, author, subtitle) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.subtitle = subtitle;
}

// take params, create a book then store it in the array
// NOTE: now takes (title, author, subtitle)
function addBookToLibrary(title, author, subtitle) {
    let id = crypto.randomUUID();
    let newBook = new Book(id, author, title, subtitle);
    myLibrary.push(newBook);
}

// sample books for testing purposes
addBookToLibrary("The Fellowship of the Ring", "J.R.R. Tolkien", "Being the First Part of The Lord of the Rings");

addBookToLibrary("To Kill a Mockingbird", "Harper Lee", "A Novel");

addBookToLibrary("1984", "George Orwell", "A Dystopian Novel");

addBookToLibrary("Frankenstein", "Mary Shelley", "Or, The Modern Prometheus");

addBookToLibrary("Pride and Prejudice", "Jane Austen", "A Story of Love and Misunderstanding");

addBookToLibrary("Foundation", "Isaac Asimov", "The Saga of the Psychohistorians");

addBookToLibrary("A Wizard of Earthsea", "Ursula K. Le Guin", "The First Book of Earthsea");

addBookToLibrary("Kindred", "Octavia E. Butler", "A Novel");

addBookToLibrary("Beloved", "Toni Morrison", "A Novel");

addBookToLibrary("Mistborn", "Brandon Sanderson", "The Final Empire");

addBookToLibrary("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", "Don't Panic");

addBookToLibrary("Dune", "Frank Herbert", "A Heroic Saga on the Desert Planet Arrakis");

// grab the container
let bookContainer = document.querySelector(".book__container");

// display the books
function displayBooks(myLibrary) {
    // get the library size
    let size = myLibrary.length;

    // loop through the array
    for (let i = 0; i < size; i++) {
        // build book elements
        // build the article to hold books
        const book = document.createElement("article");
        book.classList.add("book");

        // build the book title
        const title = document.createElement("p");
        title.classList.add("title");
        title.textContent = myLibrary[i].title;

        // build the author
        const author = document.createElement("p");
        author.classList.add("author");
        author.textContent = myLibrary[i].author;

        // build the subtitle
        const subtitle = document.createElement("p");
        subtitle.classList.add("subtitle");
        subtitle.textContent = myLibrary[i].subtitle;

        // build the book and add to the container
        book.append(title);
        book.append(author);
        book.append(subtitle);
        bookContainer.append(book);
    }
}

displayBooks(myLibrary);