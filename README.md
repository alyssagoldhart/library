# Library App

A simple JavaScript application that allows users to create and manage a personal library of books. Users can add books, view them in a dynamic display, update their read status, and remove them from the library.

This project focuses on practicing **JavaScript objects, constructors, DOM manipulation, and application structure**.

---

## Features

* Add new books using a form
* Display books dynamically on the page
* Remove books from the library
* Toggle a book's **read/unread** status
* Each book has a **unique ID** to ensure reliable DOM interactions
* Separation between **data logic** and **UI rendering**

---

## Technologies Used

* HTML
* CSS
* JavaScript (ES6)

---

## Live Demo

https://alyssagoldhart.github.io/library/

---

## Project Structure

```
library-project/
│
├── index.html
├── styles.css
├── script.js
└── README.md
```

---

## Core Concepts

### 1. Book Constructor

Books are created using a constructor function and stored in an array.

```javascript
const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
```

Each book gets a **unique ID** using `crypto.randomUUID()` to ensure stable identification even if books are removed or reordered.

---

### 2. Adding Books to the Library

A helper function creates book objects and stores them in the main array.

```javascript
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}
```

---

### 3. Displaying Books

A display function loops through the `myLibrary` array and renders each book to the page.

Books are displayed as cards or rows and linked to their data via a **data attribute**:

```html
data-id="book-id"
```

This connects DOM elements to the corresponding JavaScript object.

---

### 4. Adding New Books

Users can add books through a form that collects:

* Title
* Author
* Number of pages
* Read status

Because forms submit to a server by default, we prevent that behavior:

```javascript
event.preventDefault();
```

This allows JavaScript to process the form data instead.

---

### 5. Removing Books

Each displayed book includes a **Remove button**.

When clicked, the book is removed from the `myLibrary` array and the display is updated.

---

### 6. Toggling Read Status

Books can switch between **read** and **not read**.

This is handled using a prototype method:

```javascript
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};
```

---

## Important Design Principle

This project keeps **data and display logic separate**.

* The **library array** stores all book information.
* The **display function** reads that data and renders the UI.

This makes the application easier to maintain, update, and expand.

---

## Limitations

* No persistent storage is used.
* Reloading the page will reset the library.

---

## Future Improvements

Possible enhancements include:

* Local storage to persist books between sessions
* Edit book details
* Sorting and filtering books
* Improved UI/UX
* Search functionality

---

## Learning Goals

This project was built to practice:

* JavaScript constructors and prototypes
* Object-oriented programming concepts
* DOM manipulation
* Event handling
* Application structure and separation of concerns

---

## Author

Created as part of a JavaScript learning project.
