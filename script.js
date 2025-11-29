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
    // clear the container since this is a reusable function
    bookContainer.innerHTML = "";

    // get the library size
    let size = myLibrary.length;

    // loop through the array
    for (let i = 0; i < size; i++) {
        // build book elements
        // build the article to hold books
        const book = document.createElement("article");
        book.classList.add("book");

        // give the book a data attribute
        book.setAttribute("data-index", myLibrary[i].id);

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

        // build the status
        const status = document.createElement("p");
        status.classList.add("status");
        status.textContent = `Status: ${myLibrary[i].status}`;

        // add button subsection to the container
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        // add a button to the book
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "Delete"

        // add a button to the book
        const statusButton = document.createElement("button");
        statusButton.classList.add("statusButton");
        statusButton.textContent = "Change Status"

        // build the book and add to the container
        book.append(title);
        book.append(author);
        book.append(subtitle);
        book.append(status);

        // append the container to the book
        buttonContainer.append(deleteButton);
        buttonContainer.append(statusButton)
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

// user clicks the button so I want the modal to open
newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
});

// Note: We don't need a cancel listener because of how we've set up our cancel button

/** BOOK SUBMISSION LOGIC **/
const form = document.querySelector(".dialog__form");

form.addEventListener("submit", (e) => {
    // this listener ensures form validation occurs 
    // prevent default behavior
    e.preventDefault();
});

// user clicks confirm button
const newBookConfirmButton = document.querySelector(".dialog__button-confirm");

newBookConfirmButton.addEventListener("click", () => {
    // after form submission validation is enforced
    // this listener handles actual valid submissions
    // close the dialog with a non default value
    // don't reset already input values if the user cancels or escapes out
    newBookDialog.close("New Book Added");
});

// Attach a listener to our modal that reacts on close
newBookDialog.addEventListener("close", () => {

    if (newBookDialog.returnValue === "New Book Added") {
        // grab each value of the book elements
        const newBookTitle = document.querySelector("#title");
        const newBookAuthor = document.querySelector("#author");
        const newBookSubtitle = document.querySelector("#subtitle");
        const newBookStatus = document.querySelector("#status")
        // add new book to library
        addBookToLibrary(newBookTitle.value, newBookAuthor.value, newBookSubtitle.value, newBookStatus.value);
        // reset values for next valid run
        // reset everything
        newBookTitle.value = "";
        newBookAuthor.value = "";
        newBookSubtitle.value = "";
        newBookDialog.returnValue = "default";
        // display the books again
        displayBooks(myLibrary);
    }
});


/** DELETE LOGIC **/
// We will attach a listener to the parent since we have too many buttons
bookContainer.addEventListener("click", (e) => {
    // If it does have the deleteButton class
    if (e.target.classList.contains("deleteButton")) {
        // grab the needed book element and index
        const bookElement = e.target.closest(".book");
        const bookIndex = bookElement.dataset.index;
        // then delete the book
        deleteBook(bookIndex);
    }
    else {
        // return if we don't have the class we want
        return;
    }
});

function deleteBook(bookIndex) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === bookIndex) {
            myLibrary.splice(i, 1);
            break;
        }
    }
    displayBooks(myLibrary);
}

/** CHANGE STATUS LOGIC **/
// We will attach a listener to the parent since we have too many buttons
bookContainer.addEventListener("click", (e) => {
    // If it does have the deleteButton class
    if (e.target.classList.contains("statusButton")) {
        // grab the needed book element and index
        const bookElement = e.target.closest(".book");
        const bookIndex = bookElement.dataset.index;
        // then delete the book
        newStatus(bookIndex);
    }
    else {
        // return if we don't have the class we want
        return;
    }
});

Book.prototype.changeStatus = function () {
    this.status === "Read" ? this.status = "Unread" : this.status = "Read";
}

// it is important that we change the status in the array and redraw
// rather than just change the status on the html
// this way we maintain data integrity
function newStatus(bookIndex) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === bookIndex) {
            myLibrary[i].changeStatus();
            break;
        }
    }
    displayBooks(myLibrary);
}