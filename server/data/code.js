const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

function codeGen() {
    var length = 10;
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

const codeSchema = new Schema(
  {
    _id: ObjectId,
    code: {
      type: String,
      default: codeGen
    },
    book: {
      type: ObjectId,
      ref: 'Book'
    },
    user: {
      type: ObjectId,
      ref: 'Student',
      default: null,
    }
  }
);

module.exports = mongoose.model('Code', codeSchema);
