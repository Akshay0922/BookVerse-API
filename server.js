const express = require('express');
const app = express();
const port = 2209;

// Import book routes
const bookRoutes = require('./src/routes/bookRoutes.js');

app.use(express.json());

// For all api end points
app.use('/api/books', bookRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});