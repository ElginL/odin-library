// Global variables
let myLibrary = [];
let bookIndexCounter = 0;

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
    const readStatus = document.getElementById("readStatus").checked ? "read" : "not read";

    const newBook = new Book(title, author, pageCount, readStatus);
    myLibrary.push(newBook);

    closeForm(e);
    displayBooks();
}

const book1 = new Book("The Hobbit", "J.R.R Tolkien", 318, "not read");
const book2 = new Book("Harry Potter and the Goblet of Fire", "J.K Rowling", 636, "read");
const book3 = new Book("Thomas Calculus", "George B. Thomas", 1676, "read");
const book4 = new Book("Thomas Calculus", "George B. Thomas", 1676, "read");

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);

function displayBooks() {
    booksContainer.innerHTML = "";
    bookIndexCounter = 0;
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

    // Create cross for the book
    const crossBtn = document.createElement("button");
    crossBtn.classList.add("delete-book-btn");
    crossBtn.textContent = "X";
    crossBtn.setAttribute("data-index", bookIndexCounter);
    crossBtn.addEventListener("click", deleteBookHandler);
    bookIndexCounter++;

    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookPages);
    bookContainer.appendChild(bookReadStatus);
    bookContainer.appendChild(crossBtn);

    return bookContainer;
}

function openAddBookForm() {
    modal.style.display = "block";
    addBookForm.style.transform = "scale(1)";
}

function closeForm(e) {
    e.preventDefault();
    modal.style.display = "none";
    addBookForm.style.transform = "scale(0)";
    deleteBookForm.style.transform = "scale(0)";
}

function deleteBookHandler(e) {
    console.log("Open");

    const bookIndex = e.target.getAttribute("data-index");

    modal.style.display = "block";
    deleteBookForm.style.transform = "scale(1)";

    const noBtn = document.querySelector(".no-btn");
    const yesBtn = document.querySelector(".yes-btn");
    
    noBtn.onclick = closeForm;
    yesBtn.onclick = e => {
        myLibrary.splice(bookIndex, 1);
        closeForm(e);
        displayBooks();
    };
}

const booksContainer = document.querySelector(".books-container");
const addBookBtn = document.querySelector(".add-book-btn");
const modal = document.querySelector(".modal");
const addBookForm = document.querySelector(".add-book-form");
const closeFormBtn = document.querySelector(".close-form-btn");
const deleteBookForm = document.querySelector(".delete-book-form");

addBookBtn.addEventListener("click", openAddBookForm);
modal.addEventListener("click", closeForm);
closeFormBtn.addEventListener("click", closeForm);
addBookForm.addEventListener("submit", addBookToLibrary);

// Might need to remove later
displayBooks();