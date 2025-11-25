const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../books.json');

// To read books from the JSON file
exports.readBooks = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// To write books to the JSON file
exports.writeBooks = (books) => {
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
};