// Import books data
let booksData = require('./../data/booksData.js');

// To get all available books
exports.getAllBooks = (req, res) => {
    res.json(booksData);
};

// To get a specific book by ID
exports.getBookById = (req, res) => {
    const id = parseInt(req.params.id);
    const book = booksData.find(book => book.id === id);
    if (!book) {
        return res.status(404).json({ error: "Book Not Found" });
    }
    res.json(book);
}

// To create a new book
exports.createBook = (req, res) => {
    const { title, author, publishedYear } = req.body;

    const newBook = {
        id: booksData.length ? booksData[booksData.length - 1].id + 1 : 1,
        title,
        author,
        publishedYear: publishedYear || null
    };

    booksData.push(newBook);
    // res.status(201).json(newBook);
    res.status(201).json({ message: "Book created successfully" });
};

// To update an existing book
exports.updateBook = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author, publishedYear } = req.body;

    const bookIndex = booksData.findIndex(book => book.id === id);
    if (bookIndex === -1) {
        return res.status(404).json({ error: "Book Not Found" });
    }

    const updatedBook = {
        id,
        title: title || booksData[bookIndex].title,
        author: author || booksData[bookIndex].author,
        publishedYear: publishedYear || booksData[bookIndex].publishedYear
    };
    booksData[bookIndex] = updatedBook;
    res.json(updatedBook);
};

// To delete a book
exports.deleteBook = (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = booksData.findIndex(book => book.id === id);
    if (bookIndex === -1) {
        return res.status(404).json({ error: "Book Not Found" });
    }
    booksData.splice(bookIndex, 1);
    res.json({ message: "Book Deleted Successfully!" });
};