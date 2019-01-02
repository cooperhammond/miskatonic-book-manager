const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const bookSchema = new Schema(
  {
    _id: ObjectId,
    title: String,
    author: String,
    codes: [
      {
        type: ObjectId,
        ref: 'Code'
      }
    ],
  }
);

module.exports = mongoose.model('Book', bookSchema);
