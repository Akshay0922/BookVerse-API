// Validation for books
module.exports = (req, res, next) =>{
    const {title, author} = req.body;

    if(!title || !author){
        return res.status(400).json({error: "Title and Author are required"});
    }
    next();
};