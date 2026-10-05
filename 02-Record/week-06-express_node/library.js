
const express = require('express');

// Sample book data stored in an array of objects
const books = [
    {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        available: true
    },
    {
        id: 2,
        title: '1984',
        author: 'George Orwell',
        available: false
    },
    {
        id: 3,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        available: true
    }
];

// Create an Express application
const library = express();

// Home route
library.get('/', (req, res) => {
    res.send('Welcome to Digital Library');
});

// Route to display all books
library.get('/books', (req, res) => {
    res.json(books);
});

// Route to find a book by ID
library.get('/books/:id', (req, res) => {

    // Convert the id parameter from string to integer
    const bookId = parseInt(req.params.id);

    // Check whether ID is a valid number
    if (isNaN(bookId)) {
        return res.status(400).send('Book ID must be a number');
    }

    // Search for the book with matching ID
    const book = books.find(b => b.id === bookId);

    // If book is found, return its details
    if (book) {
        res.json(book);
    }

    // If book is not found, return 404 error
    else {
        res.status(404).send('The Book is not found');
    }
});

// Route to display only available books
library.get('/availablebooks', (req, res) => {

    // Get only available books and extract titles
    const booknames = books
        .filter(b => b.available)
        .map(b => b.title);

    // Send the available book names
    res.json({
        message: 'The Available Books in Library are:',
        booknames
    });
});

// Start the server and listen at Port 3000
library.listen(3000, () => {
    console.log('The Library is opened');
});

