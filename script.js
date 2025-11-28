// create an empty array
const myLibrary = [];

// create Book constructor
function Book(id, title, author, subtitle, status) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.subtitle = subtitle;
    this.status = status;
}

// take params, create a book then store it in the array
// NOTE: now takes (title, author, subtitle)
function addBookToLibrary(title, author, subtitle, status) {
    let id = crypto.randomUUID();
    let newBook = new Book(id, title, author, subtitle, status);
    myLibrary.push(newBook);
}

// sample books for testing purposes
addBookToLibrary("The Fellowship of the Ring", "J.R.R. Tolkien", "Being the First Part of The Lord of the Rings", "Read");

addBookToLibrary("To Kill a Mockingbird", "Harper Lee", "A Novel", "Read");

addBookToLibrary("1984", "George Orwell", "A Dystopian Novel", "Unread");

addBookToLibrary("Frankenstein", "Mary Shelley", "Or, The Modern Prometheus", "Unread");

addBookToLibrary("Pride and Prejudice", "Jane Austen", "A Story of Love and Misunderstanding", "Unread");

addBookToLibrary("Foundation", "Isaac Asimov", "The Saga of the Psychohistorians", "Unread");

addBookToLibrary("A Wizard of Earthsea", "Ursula K. Le Guin", "The First Book of Earthsea", "Read");

addBookToLibrary("Kindred", "Octavia E. Butler", "A Novel", "Read");

addBookToLibrary("Beloved", "Toni Morrison", "A Novel", "Read");

addBookToLibrary("Mistborn", "Brandon Sanderson", "The Final Empire", "Unread");

addBookToLibrary("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", "Don't Panic", "Read");


addBookToLibrary("Dune", "Frank Herbert", "A Heroic Saga on the Desert Planet Arrakis", "Read");



/** DISPLAY BOOKS SCRIPT */
// grab the container
let bookContainer = document.querySelector(".books__container");

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

        // add button subsection to the container
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        // add a button to the book
        const deletButton = document.createElement("button");
        deletButton.classList.add("deleteButton");
        deletButton.textContent = "Delete"

        // add a button to the book
        const readButton = document.createElement("button");
        readButton.classList.add("readButton");
        readButton.textContent = "Mark Read"

        // build the book and add to the container
        book.append(title);
        book.append(author);
        book.append(subtitle);

        // append the container to the book
        buttonContainer.append(deletButton);
        buttonContainer.append(readButton)
        book.append(buttonContainer);

        // finally add the book to our bookContainer
        bookContainer.append(book);
    }
}

displayBooks(myLibrary);

/** ADD NEW BOOKS SCRIPT */
// grab the add new book button
const newBookButton = document.querySelector(".header__actions-button");

// grab the modal dialog
const newBookDialog = document.querySelector(".dialog");

// grab the cancel button
const newBookCancelButton = document.querySelector(".dialog__button-cancel");

// user clicks the button so I want the modal to open
newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
})

// we don't need a cancel listener because of how we've set up our cancel button

// book submission logic

// grab each value of the book elements
// user clicks confirm
// prevent default behavior
// create book object with values set to form element values
// close dialog with book as parameter so return value of dialog is book object and not default
// use modal listener that reacts on close
    // if value is not default
        // then add book to library using book object and addBookToLibraryFunction 
        // then call displayBooks function again
    // else
        // do nothing