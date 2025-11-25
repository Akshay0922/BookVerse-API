const express = require('express');
const router = express.Router();

// Import book controller and validation middleware for using validations
const bookController = require('../controllers/bookController.js');
const validateBook = require('../middleware/validateBook.js');

// To get all available books
router.get('/', bookController.getAllBooks);

// To get a specific book by ID
router.get('/:id', bookController.getBookById);

// To create a new book
router.post('/', validateBook, bookController.createBook);

// To update an existing book
router.put('/:id', validateBook, bookController.updateBook);

// To delete a book
router.delete('/:id', bookController.deleteBook);

module.exports = router;