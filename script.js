const container = document.querySelector("#libraryContainer");
const newBookForm = document.querySelector("#newBookForm");

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        let isRendered = false;
        this.info = function () {
            return title + " by " + author + ", " + pages + " pages, " + read;
        };
    }
}

function addBookToLibrary() {
    var newTitle = document.getElementById('newTitle').value;
    var newAuthor = document.getElementById('newAuthor').value;
    var newPages = document.getElementById('newPages').value;
    var newRead = document.getElementById('newRead').checked;
    let userBook = new Book(newTitle, newAuthor, newPages, newRead);
    myLibrary.push(userBook);
    render();
}

function render() {
    let i = 0;
    myLibrary.forEach((book) => {
        if (!book.isRendered) {
            let dataBook = 'myLibrary[' + i + ']';

            const div = document.createElement('div');
            div.classList.add('book');
            div.setAttribute('data-book', dataBook);
            container.appendChild(div);

            const titleContainer = document.createElement('div');
            div.appendChild(titleContainer);

            const bookTitle = document.createElement('h4');
            titleContainer.appendChild(bookTitle);
            bookTitle.textContent = 'Book: ' + book.title;

            const authorContainer = document.createElement('div');
            div.appendChild(authorContainer);

            const bookAuthor = document.createElement('span');
            authorContainer.appendChild(bookAuthor);
            bookAuthor.textContent = 'Author: ' + book.author;

            const pagesContainer = document.createElement('div');
            div.appendChild(pagesContainer);

            const bookPages = document.createElement('span');
            pagesContainer.appendChild(bookPages);
            bookPages.textContent = 'Pages: ' + book.pages;
            
            const readContainer = document.createElement('div');
            div.appendChild(readContainer);

            const bookRead = document.createElement('span');
            readContainer.appendChild(bookRead);
            bookRead.setAttribute('id', 'status' + i);
            changeReadTextContent(bookRead, book);

            book.isRendered = true;

            const buttonContainer = document.createElement('div');
            div.appendChild(buttonContainer);

            const statusButton = document.createElement('button');
            buttonContainer.appendChild(statusButton);
            statusButton.textContent = 'Change Read Status';
            statusButton.setAttribute('onclick', 'toggleReadStatus(' + i + ')');

            const deleteButton = document.createElement('button');
            buttonContainer.appendChild(deleteButton);
            deleteButton.textContent = 'Delete Book';
            deleteButton.setAttribute('onclick', 'deleteBook(' + i + ')');
        }
        i++;
    });
}

function showNewBook() {
    if (newBookForm.style.display === "block")
        newBookForm.style.display = 'none';
    else
        newBookForm.style.display = 'block';
}

function deleteBook(x) {
    let deletedBook = document.querySelector('[data-book="myLibrary[' + x + ']"]');
    deletedBook.remove();
    myLibrary.splice(x, 1);
}

function changeReadTextContent(element, x) {
    if(x.read == true)
        element.textContent = 'Has Been Read.';
    else
        element.textContent = 'Has Not Been Read.';
}

function toggleReadStatus(x) {
    let element = document.getElementById('status' + x);
    if (myLibrary[x].read)
        myLibrary[x].read = false;
    else
        myLibrary[x].read = true;
    changeReadTextContent(element, myLibrary[x]);
}

let book1 = new Book('A Feast for Crows', 'George R. R. Martin', 1104, true);
let book2 = new Book('Caliban\'s War', 'James S. A. Corey', 605, false);

let myLibrary = [book1, book2];

render();