// Global Book Container
let bookContainer = document.querySelector(".books__container");

// Create Book Class
class Book {
    // Create Book constructor
    constructor(title, author, subtitle, status = "Unread") {
        this.id = crypto.randomUUID();
        this.author = author;
        this.title = title;
        this.subtitle = subtitle;
        this.status = status;
    }
}

// Create Library Class
class Library {
    // Fields
    library;

    constructor(library = []) {
        if (!Array.isArray(library)) {
            throw new Error("Library constructor expects an array.")
        }
        this.library = library;
    }

    addBookToLibrary(book) {
        this.library.push(book);
    }

    changeBookStatus(bookIndex) {
        for (let i = 0; i < this.library.length; i++) {
            if (this.library[i].id === bookIndex) {
                this.library[i].status === "Read" ? this.library[i].status = "Unread" : this.library[i].status = "Read";
                break;
            }
        }
    }

    deleteBookFromLibrary(bookIndex) {
        for (let i = 0; i < this.library.length; i++) {
            if (this.library[i].id === bookIndex) {
                this.library.splice(i, 1);
                break;
            }
        }
    }
}

// Create a new library and add all sample books to the library
const myLibrary = new Library();

// Sample books for testing purposes
myLibrary.addBookToLibrary(new Book("The Fellowship of the Ring", "J.R.R. Tolkien", "Being the First Part of The Lord of the Rings", "Read"));

myLibrary.addBookToLibrary(new Book("To Kill a Mockingbird", "Harper Lee", "A Novel", "Read"));

myLibrary.addBookToLibrary(new Book("1984", "George Orwell", "A Dystopian Novel", "Unread"));

myLibrary.addBookToLibrary(new Book("Frankenstein", "Mary Shelley", "Or, The Modern Prometheus", "Unread"));

myLibrary.addBookToLibrary(new Book("Pride and Prejudice", "Jane Austen", "A Story of Love and Misunderstanding", "Unread"));

myLibrary.addBookToLibrary(new Book("Foundation", "Isaac Asimov", "The Saga of the Psychohistorians", "Unread"));

myLibrary.addBookToLibrary(new Book("A Wizard of Earthsea", "Ursula K. Le Guin", "The First Book of Earthsea", "Read"));

myLibrary.addBookToLibrary(new Book("Kindred", "Octavia E. Butler", "A Novel", "Read"));

myLibrary.addBookToLibrary(new Book("Beloved", "Toni Morrison", "A Novel", "Read"));

myLibrary.addBookToLibrary(new Book("Mistborn", "Brandon Sanderson", "The Final Empire", "Unread"));

myLibrary.addBookToLibrary(new Book("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", "Don't Panic", "Read"));

myLibrary.addBookToLibrary(new Book("Dune", "Frank Herbert", "A Heroic Saga on the Desert Planet Arrakis", "Read"));

// --------------------BUILD AND DISPLAY BOOKS----------------//
const displayBooks = (myLibrary) => {
    // Clear the container since this is a reusable function
    bookContainer.innerHTML = "";

    // Get the size of the library property in the myLibrary object
    let size = myLibrary.library.length;

    // Loop through the array, build the book elements and append to the book container
    for (let i = 0; i < size; i++) {
        // ----------------- BOOK ELEMENTS ----------------- //
        // Build the article to hold book elements
        const book = document.createElement("article");
        book.classList.add("book");
        book.setAttribute("data-index", myLibrary.library[i].id);

        // Build the elements for the book title
        const title = document.createElement("p");
        title.classList.add("title");
        title.textContent = myLibrary.library[i].title;

        // Build the elements for the book author
        const author = document.createElement("p");
        author.classList.add("author");
        author.textContent = myLibrary.library[i].author;

        // Build the elements for the book subtitle
        const subtitle = document.createElement("p");
        subtitle.classList.add("subtitle");
        subtitle.textContent = myLibrary.library[i].subtitle;

        // Build the elements for the book status
        const status = document.createElement("p");
        status.classList.add("status");
        status.textContent = `Status: ${myLibrary.library[i].status}`;

        // --------------------BOOK BUTTONS ----------------//
        // Add a container to hold buttons for each book
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        // Add a delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "Delete"

        // Add a change status button
        const statusButton = document.createElement("button");
        statusButton.classList.add("statusButton");
        statusButton.textContent = "Change Status"

        // Add book elements to the book
        book.append(title, author, subtitle, status);

        // Append buttons to the buttton container
        buttonContainer.append(deleteButton, statusButton);

        // Append the buttonContainer to the book
        book.append(buttonContainer);

        // Finally append the book to the bookContainer
        bookContainer.append(book);
    }
}

// Display the books
displayBooks(myLibrary);

// --------------------ADD A NEW BOOK TO THE LIBRARY--------------------//
// Grab the add new book button
const newBookButton = document.querySelector(".header__actions-button");

// Grab the confirm addition of new book button
const newBookConfirmButton = document.querySelector(".dialog__button-confirm");

// Grab the cancel addition of new book button
const newBookCancelButton = document.querySelector(".dialog__button-cancel");

// Grab the modal dialog
const newBookDialog = document.querySelector(".dialog");

// Grab the form
const form = document.querySelector(".dialog__form");

// Opens the modal on user click
// Note: We don't need a cancel listener because of how we've set up our cancel button
newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
});

// Cancels the book addition on click
newBookCancelButton.addEventListener("click", () => {
    // just close
    newBookDialog.close();
});

// Attach a listener to our modal that reacts on close
newBookDialog.addEventListener("close", () => {

    if (newBookDialog.returnValue === "default") {
        // grab each value of the book elements
        const newBookTitle = document.querySelector("#title");
        const newBookAuthor = document.querySelector("#author");
        const newBookSubtitle = document.querySelector("#subtitle");
        const newBookStatus = document.querySelector("#status")
        // add new book to library
        myLibrary.addBookToLibrary(new Book(newBookTitle.value, newBookAuthor.value, newBookSubtitle.value, newBookStatus.value));
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

// --------------------DELETE AN EXISTING BOOK FROM THE LIBRARY--------------------//
// Attach a listener to the parent since we have too many buttons
bookContainer.addEventListener("click", (e) => {
    // If it does have the deleteButton class
    if (e.target.classList.contains("deleteButton")) {
        // Grab the book element and index
        const bookElement = e.target.closest(".book");
        const bookIndex = bookElement.dataset.index;
        // Then delete the book from the array
        myLibrary.deleteBookFromLibrary(bookIndex);
        // Redraw the UI
        displayBooks(myLibrary);
    }
    else {
        // Return if we don't have the class we want
        return;
    }
});

// --------------------CHANGE THE STATUS OF AN EXISTING BOOK IN THE LIBRARY--------------------//
bookContainer.addEventListener("click", (e) => {
    // If it does have the change status class
    if (e.target.classList.contains("statusButton")) {
        // Grab the book element and index
        const bookElement = e.target.closest(".book");
        const bookIndex = bookElement.dataset.index;
        // Then change the status of the book
        myLibrary.changeBookStatus(bookIndex);
        // Redraw the UI
        displayBooks(myLibrary);
    }
    else {
        // Return if we don't have the class we want
        return;
    }
});