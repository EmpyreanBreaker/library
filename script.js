// create an empty array
const myLibrary = [];


// create Book constructor
function Book(id, author, title, subtitle) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.subtitle = subtitle;
}

// take params, create a book then store it in the array
function addBookToLibrary(author, title, subtitle) {
    let id = crypto.randomUUID();
    let newBook = new Book(id, author, title, subtitle);
    myLibrary.push(newBook);
}

// sample books for testing purposes
addBookToLibrary("J.R.R. Tolkien", "The Fellowship of the Ring", "Being the First Part of The Lord of the Rings");

addBookToLibrary("Harper Lee", "To Kill a Mockingbird", "A Novel");

addBookToLibrary("George Orwell", "1984", "A Dystopian Novel");

addBookToLibrary("Mary Shelley", "Frankenstein", "Or, The Modern Prometheus");

addBookToLibrary("Jane Austen", "Pride and Prejudice", "A Story of Love and Misunderstanding");

addBookToLibrary("Isaac Asimov", "Foundation", "The Saga of the Psychohistorians");

addBookToLibrary("Ursula K. Le Guin", "A Wizard of Earthsea", "The First Book of Earthsea");

addBookToLibrary("Octavia E. Butler", "Kindred", "A Novel");

addBookToLibrary("Toni Morrison", "Beloved", "A Novel");

addBookToLibrary("Brandon Sanderson", "Mistborn", "The Final Empire");

addBookToLibrary("Douglas Adams", "The Hitchhiker's Guide to the Galaxy", "Don't Panic");

addBookToLibrary("Frank Herbert", "Dune", "A Heroic Saga on the Desert Planet Arrakis");