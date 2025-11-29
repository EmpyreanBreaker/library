# My Library

A small vanilla JavaScript app for managing a personal book collection.
Users can add books, remove them, and toggle their read status. The UI is built with semantic HTML and modern CSS Grid, and all book data is stored in an in-memory array.

This project is based on *The Odin Project* “Library” assignment, with a focus on:

* Separating data (book objects) from presentation (DOM)
* Using constructors and prototype methods
* Practicing modern layout with CSS Grid
* Exploring the native `<dialog>` element for modals

---

## Features

* **Add New Books**

  * “Add New Book” button in the header opens a modal form.
  * Form collects: title, author, subtitle, and read status.
  * All fields are required; native HTML form validation is used to prevent empty submissions.

* **Book Cards**

  * Books are rendered as individual cards inside a grid (`Your Books` section).
  * Each card displays the core book data and exposes controls for:

    * Toggling the read status (`Read` ↔ `Unread`)
    * Removing the book from the library

* **Read Status Toggle (Prototype Method)**

  * Each book is created via a `Book` constructor.
  * A `Book.prototype` method is defined to toggle the `status` property between `"Read"` and `"Unread"`.
  * The app updates the underlying data *first*, then re-renders the DOM from the array to maintain data integrity.

* **Remove Books**

  * Each card has a “remove” button.
  * Books in the DOM are associated with their backing objects via a `data-*` attribute that stores the book’s unique ID.
  * Clicking “remove” finds the corresponding object in the `myLibrary` array and removes it, followed by a full re-render.

* **Event Delegation for Buttons**

  * Status toggle and delete actions are handled via **event delegation** on the book container.
  * Click events bubble up to the parent, and the app uses `event.target.closest(...)` to determine which button was activated and which book card it belongs to.

* **Modal Form Using `<dialog>`**

  * The new-book form is presented in a native `<dialog>` element.
  * The dialog integrates with:

    * A “Submit” button that triggers validation and, on success, adds a new book to the array and closes the dialog with a custom `returnValue`.
    * A “Cancel” button that closes the dialog without modifying the library.
  * A `close` event listener on the dialog reads `returnValue`, decides whether to add a new book, and then resets the form fields.

* **Layout with CSS Grid**

  * Overall layout (`.library__container`) is a two-column grid:

    * Sidebar on the left
    * Header and content stacked on the right
  * The sidebar and header each use their own nested CSS grids for sub-layout:

    * Sidebar: stacked title and navigation menus (primary and secondary).
    * Header: profile information on the left, actions (Add New Book) on the right.
  * The books area uses a responsive grid (`auto-fill` with `minmax`) to lay out book cards.

---

## Data Model & Architecture

* All books are stored in a single array called `myLibrary`.
* A `Book` constructor is used to create book objects.
* Each book is assigned a **unique, stable ID** using `crypto.randomUUID()`.

  * This ID is used as a data attribute on the corresponding DOM element.
  * The ID decouples visual order from data order—books can be rearranged or removed without breaking references.
* A dedicated function is responsible for:

  * Creating new `Book` instances,
  * Pushing them into `myLibrary`,
  * Calling the render function to update the UI.

Rendering is handled by a function that:

1. Clears the current book container in the DOM.
2. Loops through `myLibrary`.
3. Creates and appends a corresponding DOM card for each book.

This keeps **data** and **rendering** concerns clearly separated.

---

## Form & Validation Behavior

* The “New Book” dialog contains a form with fields for:

  * Title (required)
  * Author (required)
  * Subtitle (required)
  * Status (select: `Read` / `Unread`, required)
* Native HTML validation (`required`) ensures fields cannot be blank.
* When the form is submitted via the “Submit” button:

  * If validation fails, the browser displays error messages and the dialog remains open.
  * If validation succeeds:

    * The library adds a new `Book` object using the form values.
    * The book list is re-rendered.
    * The form fields are reset for the next use.

The “Cancel” button closes the dialog without adding a book and avoids triggering validation.

---

## UI Structure

* **Header**

  * Profile block with avatar and greeting text.
  * “Add New Book” button to open the dialog.
* **Sidebar**

  * App title: “My Bookshelf”.
  * Primary navigation (Library, Profile, Messages, Book Loans).
  * Secondary navigation (Settings, Support, Privacy).
* **Main Content**

  * `Your Books` section with a grid container for dynamically generated book cards.
* **Dialog**

  * Modal form for creating new books.
  * Positioned and styled with CSS to feel integrated with the main layout.

---

## Technologies Used

* **HTML5**

  * Semantic structure with `<header>`, `<aside>`, `<main>`, `<section>`, and `<dialog>`.
* **CSS3**

  * CSS Grid for overall layout and component-level grids.
  * Minimal, clean styling via `design-styles.css`, `grid-styles.css`, and `reset-styles.css`.
* **JavaScript (ES6+)**

  * Constructor function and prototype methods.
  * Arrays and DOM manipulation.
  * Event delegation and native form/validation behavior.
  * `crypto.randomUUID()` for unique IDs.

---

## Getting Started

1. Clone or download the repository.
2. Open `index.html` in your browser (no build step required).
3. Click **“Add New Book”** in the header to open the dialog.
4. Fill in the form and click **Submit** to add a book.
5. Use the buttons on each card to:

   * Toggle the read status.
   * Remove the book from the library.

> Note: Data is stored in memory only. Refreshing the page clears the library.

---

## Possible Future Improvements

* Persist library data to `localStorage` so books survive page reloads.
* Add filters/search (e.g., show only read/unread books, search by title/author).
* Add sorting options (by title, author, status).
* Enhance accessibility (keyboard focus management, ARIA attributes for the dialog).
* Add animations when adding/removing books or toggling status.

---

## Credits & Acknowledgements

* **Project Specification:**
  Based on the *The Odin Project* “Library” assignment.

* **Header Image:**
  Photo by **Isaac Benhesed** on Unsplash
  Image: [https://unsplash.com/photos/people-inside-library-RqtElNpHcs8](https://unsplash.com/photos/people-inside-library-RqtElNpHcs8)

---
