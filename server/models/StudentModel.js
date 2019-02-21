const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    codes: [
      {
        type: ObjectId,
        ref: 'Code'
      }
    ]
  }
);

studentSchema.post('remove', function (student) {

  var query = mongoose.model('Code').find({ _id: { $in: student.codes } });

  query.then(async (codes) => {
    for (let index = 0; index < student.codes.length; index++) {
      if (codes[index]) {
        await codes[index].update({ $set: { student: null } });
      }
    }
  });

  query.catch((err) => {
    console.error(err);
  });
});

studentSchema.statics.addCode = async function (studentId, codeId) {

  var student = await mongoose.model('Student').findOne({ _id: studentId });

  if (student) {
    student.update(
      { $push: { "codes": mongoose.Types.ObjectId(codeId) } },
      { safe: true, upsert: true }).exec();
  }
}


studentSchema.statics.removeCode = async function (studentId, codeId) {
  var student = await mongoose.model('Student').findOne({ _id: studentId });

  if (student) {
    student.update(
      { $pull: { "codes": mongoose.Types.ObjectId(codeId) } },
      { safe: true, upsert: true }).exec();
  }
}

var Student = mongoose.model('Student', studentSchema);
module.exports = Student;
