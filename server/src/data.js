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

const studentSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: String,
    email: String,
    codes: [
      {
        type: ObjectId,
        ref: 'Code'
      }
    ]
  }
);

var Book = mongoose.model('Book', bookSchema);
var Code = mongoose.model('Code', codeSchema);
var Student = mongoose.model('Student', studentSchema);

module.exports = {
  Book,
  Code,
  Student
};
