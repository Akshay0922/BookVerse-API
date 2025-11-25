// Validation for books
// module.exports = (req, res, next) =>{
//     const {title, author} = req.body;

//     if(!title || !author){
//         return res.status(400).json({error: "Title and Author are required"});
//     }
//     next();
// };


// Validation for books
module.exports = (req, res, next) => {
    const { title, author, publishedYear } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: 'Title and Author are required' });
    }

    if (publishedYear) {
        const year = parseInt(publishedYear);
        const currentYear = new Date().getFullYear();
        if (year < 1000 || year > currentYear) {
            return res.status(400).json({ error: 'Invalid published year' });
        }
    }
    next();
};