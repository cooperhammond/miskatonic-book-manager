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
    readers: {
      type: Number,
      default: 0
    }
  }
);

bookSchema.post('remove', function (book) {

  var query = mongoose.model('Code').find({ _id: { $in: book.codes } });

  query.then(async (codes) => {
    for (let index = 0; index < book.codes.length; index++) {
      if (codes[index]) {
        await codes[index].remove();
      }
    }
  });

  query.catch((err) => {
    console.error(err);
  });
});

bookSchema.statics.addCode = async function (bookId, codeId) {
  var book = await mongoose.model('Book').findOne({ _id: bookId });

  if (book) {
    book.update(
      { $push: { codes: mongoose.Types.ObjectId(codeId) } },
      { safe: true, upsert: true }).exec();
  }
}

bookSchema.statics.removeCode = async function (bookId, codeId) {
  var book = await mongoose.model('Book').findOne({ _id: bookId });

  if (book) {
    book.update(
      { $pull: { codes: mongoose.Types.ObjectId(codeId) } },
      { safe: true, upsert: true }).exec();
  }
}

bookSchema.statics.addReader = async function (bookId) {
  var book = await mongoose.model('Book').findOne({ _id: bookId });

  if (book) {
    book.update(
      { $inc: { readers: +1 } },
      { safe: true, upsert: true }).exec();
  }
}

bookSchema.statics.removeReader = async function (bookId) {
  var book = await mongoose.model('Book').findOne({ _id: bookId });

  if (book) {
    book.update(
      { $inc: { readers: -1 } },
      { safe: true, upsert: true }).exec();
  }
}

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
