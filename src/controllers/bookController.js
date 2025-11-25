// Import books data
// let booksData = require('./../data/booksData.js');


// To get all available books
// exports.getAllBooks = (req, res) => {
//     res.json(booksData);
// };


// To get a specific book by ID
// exports.getBookById = (req, res) => {
//     const id = parseInt(req.params.id);
//     const book = booksData.find(book => book.id === id);
//     if (!book) {
//         return res.status(404).json({ error: "Book Not Found" });
//     }
//     res.json(book);
// }


// To create a new book
// exports.createBook = (req, res) => {
//     const { title, author, publishedYear } = req.body;

//     const newBook = {
//         id: booksData.length ? booksData[booksData.length - 1].id + 1 : 1,
//         title,
//         author,
//         publishedYear: publishedYear || null
//     };

//     booksData.push(newBook);
//     // res.status(201).json(newBook);
//     res.status(201).json({ message: "Book created successfully" });
// };


// To update an existing book
// exports.updateBook = (req, res) => {
//     const id = parseInt(req.params.id);
//     const { title, author, publishedYear } = req.body;

//     const bookIndex = booksData.findIndex(book => book.id === id);
//     if (bookIndex === -1) {
//         return res.status(404).json({ error: "Book Not Found" });
//     }

//     const updatedBook = {
//         id,
//         title: title || booksData[bookIndex].title,
//         author: author || booksData[bookIndex].author,
//         publishedYear: publishedYear || booksData[bookIndex].publishedYear
//     };
//     booksData[bookIndex] = updatedBook;
//     res.json(updatedBook);
// };


// To delete a book
// exports.deleteBook = (req, res) => {
//     const id = parseInt(req.params.id);
//     const bookIndex = booksData.findIndex(book => book.id === id);
//     if (bookIndex === -1) {
//         return res.status(404).json({ error: "Book Not Found" });
//     }
//     booksData.splice(bookIndex, 1);
//     res.json({ message: "Book Deleted Successfully!" });
// };





// Import file handling utilities
const { readBooks, writeBooks } = require('../utils/fileHandler');

// To get all available books
exports.getAllBooks = (req, res) => {
    let books = readBooks();

    if (req.query.author) {
        books = books.filter(b => b.author.toLowerCase() === req.query.author.toLowerCase());
    }

    if (req.query.publishedYear) {
        books = books.filter(b => b.publishedYear == req.query.publishedYear);
    }
    res.json(books);
};

// To get a specific book by ID
exports.getBookById = (req, res) => {
    const id = parseInt(req.params.id);
    const books = readBooks();
    const book = books.find(b => b.id === id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
};

// To create a new book
exports.createBook = (req, res) => {
    const { title, author, publishedYear } = req.body;
    const books = readBooks();

    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        publishedYear: publishedYear || null
    };
    books.push(newBook);
    writeBooks(books);
    res.status(201).json(newBook);
};

// To update an existing book
exports.updateBook = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author, publishedYear } = req.body;
    const books = readBooks();
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return res.status(404).json({ error: 'Book not found' });

    const updatedBook = {
        ...books[index],
        title: title || books[index].title,
        author: author || books[index].author,
        publishedYear: publishedYear || books[index].publishedYear
    };
    books[index] = updatedBook;
    writeBooks(books);
    res.json(updatedBook);
};

// To delete a book
exports.deleteBook = (req, res) => {
    const id = parseInt(req.params.id);
    const books = readBooks();
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return res.status(404).json({ error: 'Book not found' });
    books.splice(index, 1);
    writeBooks(books);
    res.json({ message: 'Book deleted successfully' });
};