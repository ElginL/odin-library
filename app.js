// Global variables
let myLibrary = [];

function Book(title, author, pageCount, readStatus) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus;

    this.info = function() {
        return `${this.title} by ${this.author}, ${pageCount} pages, ${readStatus}`;
    }
}

function addBookToLibrary(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pageCount = document.getElementById("pageCount").value;
    const readStatus = document.getElementById("readStatus").checked;

    const newBook = new Book(title, author, pageCount, readStatus);
    myLibrary.push(newBook);

    closeHandler(e);
    displayBooks();
}

const book1 = new Book("The Hobbit", "J.R.R Tolkien", 318, "not read");
const book2 = new Book("Harry Potter and the Goblet of Fire", "J.K Rowling", 636, "read");
const book3 = new Book("Thomas Calculus", "George B. Thomas", 1676, "read");
const book4 = new Book("Thomas Calculus", "George B. Thomas", 1676, "read");
const book5 = new Book("Thomas Calculus", "George B. Thomas", 1676, "read");

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);
myLibrary.push(book5);

function displayBooks() {
    booksContainer.innerHTML = "";
    myLibrary.forEach(book => {
        const bookHTML = createBook(book);
        booksContainer.appendChild(bookHTML);
    })
}

function createBook(bookObj) {
    // Creates a card for the book
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");
    
    // Title for the book
    const bookTitle = document.createElement("h2");
    bookTitle.textContent = bookObj.title;

    // Author of the book
    const bookAuthor = document.createElement("h3");
    bookAuthor.textContent = bookObj.author;

    // Number of pages in the book
    const bookPages = document.createElement("p");
    bookPages.textContent = `${bookObj.pageCount} pages`;

    // Read status of the book
    const bookReadStatus = document.createElement("p");
    bookReadStatus.textContent = bookObj.readStatus;

    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookPages);
    bookContainer.appendChild(bookReadStatus);

    return bookContainer;
}

function openFormHandler() {
    modal.style.display = "block";
    addBookForm.style.transform = "scale(1)";
}

function closeHandler(e) {
    e.preventDefault();
    modal.style.display = "none";
    addBookForm.style.transform = "scale(0)";
}

const booksContainer = document.querySelector(".books-container");
const addBookBtn = document.querySelector(".add-book-btn");
const modal = document.querySelector(".modal");
const addBookForm = document.querySelector(".add-book-form");
const closeFormBtn = document.querySelector(".close-form-btn");
const addBookFormSubmit = document.querySelector(".confirm-btn");

addBookBtn.addEventListener("click", openFormHandler);
modal.addEventListener("click", closeHandler);
closeFormBtn.addEventListener("click", closeHandler);
addBookFormSubmit.addEventListener("click", addBookToLibrary);

// Might need to remove later
displayBooks();