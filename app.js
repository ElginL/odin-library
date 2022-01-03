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
    const readStatus = document.getElementById("readStatus").checked ? "Read" : "Not Read";

    const newBook = new Book(title, author, pageCount, readStatus);
    myLibrary.push(newBook);

    e.target.reset();

    closeForm(e);
    displayBooks();
}

function displayBooks() {
    booksContainer.innerHTML = "";
    bookIndexCounter = 0;
    myLibrary.forEach(book => {
        const bookHTML = createBook(book);
        booksContainer.appendChild(bookHTML);
    })

    if (myLibrary.length === 0) {
        const noBooksSentence = document.createElement("p");
        noBooksSentence.textContent = "No books yet...";
        noBooksSentence.style.cssText = "color: white; font-size: 1.25rem; text-align: center; grid-column: 2/3;";
        booksContainer.appendChild(noBooksSentence);
    }
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
    const bookReadStatus = document.createElement("button");
    bookReadStatus.textContent = bookObj.readStatus;
    bookReadStatus.setAttribute("data-index", bookIndexCounter);
    bookContainer.style.background = bookObj.readStatus === "Read" 
                                        ? "linear-gradient(to right, #4cb860, #3cd3ad)"
                                        : "linear-gradient(to right, #3e5151, #decba4)";
    bookReadStatus.addEventListener("click", changeReadStatusHandler);

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

function changeReadStatusHandler(e) {
    const bookCard = e.target.parentElement;
    
    const bookObj = myLibrary[e.target.getAttribute("data-index")];

    if (e.target.textContent === "Read") {
        bookObj.readStatus = "Not Read";
        bookCard.style.background = "linear-gradient(to right, #3e5151, #decba4)";
        e.target.textContent = "Not Read";
    } else {
        bookObj.readStatus = "Read";
        bookCard.style.background = "linear-gradient(to right, #4cb860, #3cd3ad)";
        e.target.textContent = "Read";
    }
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

displayBooks();