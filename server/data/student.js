const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

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

module.exports = mongoose.model('Student', studentSchema);
