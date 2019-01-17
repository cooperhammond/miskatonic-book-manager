const Student = require('../models/StudentModel');

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
        message: 'Student created successfully!'
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
  Student.findByIdAndUpdate(req.params.id, {$set: req.body},
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
