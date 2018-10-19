var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var booksSchema = new Schema({
  title : String,
  author: String,
  price : Number
});

module.exports = mongoose.model('books', booksSchema);