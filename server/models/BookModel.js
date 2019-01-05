const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    codes: [
      {
        type: ObjectId,
        ref: 'Code'
      }
    ],
  }
);

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
