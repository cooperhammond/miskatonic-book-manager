const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const codeSchema = new Schema(
  {
    code: {
      type: String,
      default: codeGen
    },
    book: {
      type: ObjectId,
      ref: 'Book',
      required: true,
    },
    student: {
      /* Actually an ObjectId, but needs to accept "",
         unfortunately this is only clean solution */
      type: ObjectId,
      ref: 'Student',
      default: null,
      set: (v) => {
        if (!v || v === "") {
          return null;
        } else {
          return v;
        }
      }
    }
  }
);

codeSchema.post('save', function (code) {
  
  mongoose.model('Book').addCode(code.book, code._id);
  
  if (code.student) {
    mongoose.model('Student').addCode(code.student, code._id);
    mongoose.model('Book').addReader(code.book);
  }
});

codeSchema.pre('update', function (next) {

  var query = mongoose.model('Code').findOne(this._conditions);

  query.then((code) => {

    // The easy code request exists
    if (this._update) {
      if (this._update.$set) {
        var update = this._update.$set;

        var bookChanged = false;
        var studentRemoved = false;

        if (code.book != update.book) {
          mongoose.model('Book').removeCode(code.book, code._id);
          mongoose.model('Book').addCode(update.book, code._id);
          bookChanged = true;
        }

        if (code.student != update.student) {
          mongoose.model('Student').removeCode(code.student, code._id);
          if (update.student == "" && code.student != "") {
            studentRemoved = true;
          }
          if (update.student != "") {
            mongoose.model('Student').addCode(update.student, code._id);
          }
        }

        if (!bookChanged && studentRemoved) {
          mongoose.model('Book').removeReader(code.book);
        } else if (bookChanged && studentRemoved) {
          mongoose.model('Book').removeReader(code.book);
        } else if (bookChanged && !studentRemoved) {
          if (code.student != null) {
            mongoose.model('Book').removeReader(code.book);
          }
          mongoose.model('Book').addReader(update.book);
        } else if (!bookChanged && !studentRemoved) {
          if (code.student == null) {
            mongoose.model('Book').addReader(code.book);
          }
        }
      }
    }

    next();
  });

  query.catch((err) => {
    console.error(err);
  });

});

codeSchema.post('remove', function (code) {

  mongoose.model('Book').removeCode(code.book, code._id);

  if (code.student) {
    mongoose.model('Student').removeCode(code.student, code._id);
    mongoose.model('Book').removeReader(code.book);
  }
});

var Code = mongoose.model('Code', codeSchema);
module.exports = Code;

function codeGen() {
  var length = 10;
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)]
  };
  return result;
}
