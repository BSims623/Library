const mongoose = require('mongoose')
const Book = require('../models/bookModel.js')

const getAllBooks = async (req, res) => {
    const books = await Book.find({});
    res.status(200).json(books);
};

const addBook = async (req, res) => {
    let title = req.body.title;
    if (!title) return res.status(200).send("missing required field title");
    const newBook = await Book.create({ title: title });

    res.status(200).json({ _id: newBook._id, title: newBook.title });
};

const deleteAllBooks = async (req, res) => {
    await Book.deleteMany({});
    res.status(200).send("complete delete successful");
};

const getBook = async (req, res) => {
    let bookid = req.params.id;
    try {
        const book = await Book.findById(bookid);
        if (!book) return res.status(200).send('no book exists');
        res.status(200).json(book);
    } catch (error) {
        return res.status(200).send('no book exists');
    }
};

const commentOnBook = async (req, res) => {
    let bookid = req.params.id;
    let comment = req.body.comment;
    if (!bookid) return res.status(200).send('missing required field title');
    if (!comment) return res.status(200).send('missing required field comment');
    try {
        const book = await Book.findById(bookid);
        if (!book) return res.status(200).send('no book exists');
        book.comments.push(comment)
        book.commentcount = book.commentcount + 1;
        const updatedBook = await Book.findByIdAndUpdate(bookid, { comments: book.comments, commentcount: book.commentcount }, { new: true });
        res.status(200).json(updatedBook);
    } catch (error) {
        return res.status(200).send('no book exists');
    }
};

const deleteBook = async (req, res) => {
    let bookid = req.params.id;
    try {
        const deletedBook = await Book.findByIdAndDelete(bookid)
        if (!deletedBook) return res.status(200).send('no book exists')
        return res.status(200).send('delete successful')
    } catch (error) {
        return res.status(200).send('no book exists')
    }
};

module.exports = {
    getAllBooks,
    addBook,
    deleteAllBooks,
    getBook,
    commentOnBook,
    deleteBook
}