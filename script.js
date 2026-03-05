const myLibrary = [];
const library = document.querySelector(".library");
const showDialogButton = document.getElementById("showDialog");
const bookDialog = document.getElementById("bookDialog");
const form = document.querySelector("form");
const confirmButton = document.getElementById("confirmButton");
const coancelButton = document.getElementById("cancelButton");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const emptyLibraryMessage = document.querySelector(".empty-library");

// Display modal
showDialogButton.addEventListener("click", () => {
  bookDialog.showModal();
})

// Prevent form from submitting
form.addEventListener("submit", (event) => {
  event.preventDefault;
})

// Collect and display book data
confirmButton.addEventListener("click", () => {
  if (form.checkValidity() === true) {
    if (myLibrary.length === 0) {
    library.removeChild(emptyLibraryMessage);
    };
    const readStatusInput = document.querySelector('input[type="radio"]:checked');
    if (readStatusInput.value === "true") {
      readStatus = true;
    } else {
      readStatus = false;
    };
    clearLibrary();
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readStatus
    );
    displayBooks(myLibrary);
    form.reset();
    bookDialog.close();
  }
});

coancelButton.addEventListener("click", () => {
  form.reset();
  bookDialog.close();
})

// Book constructor
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.id = crypto.randomUUID();
};

Book.prototype.toggleReadStatus = function() {
  this.readStatus = !this.readStatus;
};

// Add new book data to library array
function addBookToLibrary(title, author, pages, readStatus) {
  let book = new Book(title, author, pages, readStatus);
  myLibrary.push(book);
};


function createBookDiv() {
  const book = document.createElement("div");
  book.classList.add("book");
  return book;
} 

function createCheckBox(book) {

  const checkBoxContainer = document.createElement("div");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");

  checkBoxContainer.classList.add("checkBoxContainer");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("id", "checkbox");
  label.setAttribute["for", "checkbox"];
  label.setAttribute["id", "label"];
  if (book.readStatus === true) {
    label.textContent = "Read";
    checkBox.checked = true;
  } else if (book.readStatus === false) {
    label.textContent = "Unread";
  };

  checkBoxContainer.appendChild(checkBox);
  checkBoxContainer.appendChild(label);

  checkBox.addEventListener("change", () => {
      book.toggleReadStatus();
      if (book.readStatus === true) {
      label.textContent = "Read";
      checkBox.checked = true;
      } else if (book.readStatus === false) {
      label.textContent = "Unread";
      };
    });

  return checkBoxContainer;
};

function createDeleteButton() {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("deleteButton");
  return deleteButton;
}

function displayBooks(arr) {

  const propertiesToDisplay = ["title", "author", "pages"];

  for (let i = 0; i < arr.length; i++) {

    const bookId = `${arr[i].id}`;
    const book = createBookDiv();
    library.appendChild(book);

    propertiesToDisplay.forEach(key => {
      const bookInfo = document.createElement("p");
      book.appendChild(bookInfo);
      const bookProperty = key.split('')[0].toUpperCase() + key.slice(1);
      bookInfo.textContent= `${bookProperty}: ${arr[i][key]}`;
    });

    const checkBox = createCheckBox(arr[i]);
    book.appendChild(checkBox);

    const deleteButton = createDeleteButton();
    book.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
      deleteBook(bookId);
      clearLibrary();
      displayBooks(myLibrary);
      if (myLibrary.length === 0) {
        library.appendChild(emptyLibraryMessage);
      };
    });
  };
};

function clearLibrary() {
  while (library.lastChild) {
    library.removeChild(library.lastChild);
  };
};

function deleteBook(bookId) {
  const indexToDelete = myLibrary.findIndex(book => book.id === bookId);
  myLibrary.splice(indexToDelete, 1);
};

