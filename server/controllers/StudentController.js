const Student = require('../models/StudentModel');
const mongoose = require("mongoose");

exports.create = function (req, res) {
  let student = new Student(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }
  );

  student.save(function (err) {
    if (err) {
      res.send(err);      // There's an error! Alert the client!
      console.error(err); // There's an error! Alert us!
    } else {
      res.send({
        message: 'Student created successfully!',
        id: student.id
      });
    }
  })
}

exports.readAll = function (req, res) {
  Student.find({}, function (err, students) {
    if (err) {
      res.send(err);      // There's an error! Alert the client!
      console.error(err); // There's an error! Alert us!
    } else {
      res.send(students);
    }
  });
}

exports.readSingle = function (req, res) {
  Student.findById(req.params.id, function (err, student) {
    if (err) {
      res.send(err);      // There's an error! Alert the client!
      console.error(err); // There's an error! Alert us!
    } else {
      res.send(student);
    }
  });
}

exports.update = function (req, res) {
  var body = req.body;

  console.log(body);

  if (body.addCode) {
    Student.findByIdAndUpdate(req.params.id,
      { $push: { "codes": mongoose.Types.ObjectId(body.addCode) } },
      {safe: true, upsert: true},
      function (err, student) {
        if (err) {
          res.send(err);      // There's an error! Alert the client!
          console.error(err); // There's an error! Alert us!
        }
      },
    );
  } else if (body.removeCode) {
    Student.findByIdAndUpdate(req.params.id,
      { $pull: { codes: body.removeCode }},
      {safe: true, upsert: true},
      function (err, student) {
        if (err) {
          res.send(err);      // There's an error! Alert the client!
          console.error(err); // There's an error! Alert us!
        }
      },
    );
  }

  delete body["addCode"];
  delete body["removeCode"];


  Student.findByIdAndUpdate(req.params.id, {$set: body},
    function (err, student) {
      if (err) {
        res.send(err);      // There's an error! Alert the client!
        console.error(err); // There's an error! Alert us!
      } else {
        res.send({
          message: "Student updated!"
        });
      }
    });
}

exports.delete = function (req, res) {
  Student.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.send(err);      // There's an error! Alert the client!
      console.error(err); // There's an error! Alert us!
    } else {
      res.send({
        message: "Student deleted!"
      });
    }
  });
}
