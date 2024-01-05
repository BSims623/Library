/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const { getAllBooks } = require('../controllers/book.js')
const { addBook } = require('../controllers/book.js')
const { deleteAllBooks } = require('../controllers/book.js')
const { getBook } = require('../controllers/book.js')
const { commentOnBook } = require('../controllers/book.js')
const { deleteBook } = require('../controllers/book.js')

module.exports = function (app) {

  app.route('/api/books')
    .get(getAllBooks)
    .post(addBook)
    .delete(deleteAllBooks);



  app.route('/api/books/:id')
    .get(getBook)
    .post(commentOnBook)
    .delete(deleteBook);

};
