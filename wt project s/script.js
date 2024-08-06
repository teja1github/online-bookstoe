// Book class: Represents a Book
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

// UI class: Handle UI tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('li');

        row.innerHTML = `
            <strong>Title:</strong> ${book.title} <br>
            <strong>Author:</strong> ${book.author} <br>
            <a href="#" class="delete">Delete</a>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
    }
}

// Store class: Handle storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(author) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.author === author) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
function addBook() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;

    if (title === '' || author === '') {
        alert('Please fill in all fields');
        return;
    }

    const book = new Book(title, author);

    UI.addBookToList(book);

    Store.addBook(book);

    UI.clearFields();
}

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.querySelector('strong').innerText.split(':')[1].trim());
});
