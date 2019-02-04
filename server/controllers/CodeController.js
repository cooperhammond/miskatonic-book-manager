const Code = require('../models/CodeModel');

exports.create = function (req, res) {
  let code = new Code(
    {
      book: req.body.book,
      student: req.body.student ? req.body.student : null
    }
  );

  code.save(function (err) {
    if (err) {
      res.send(err);      // There's an error! Alert the client!
      console.error(err); // There's an error! Alert us!
    } else {
      res.send({
        message: "Code created successfully!",
        id: code.id,
      });
    }
  })
}

exports.readAll = function (req, res) {
  Code.find({}, function (err, codes) {
    if (err) {
      res.send(err);      // There's an error! Alert the client!
      console.error(err); // There's an error! Alert us!
    } else {
      res.send(codes);
    }
  });
}

exports.readSingle = function (req, res) {
  Code.findById(req.params.id, function (err, code) {
    if (err) {
      res.send(err);      // There's an error! Alert the client!
      console.error(err); // There's an error! Alert us!
    } else {
      res.send(code);
    }
  });
}

exports.update = function (req, res) {
  Code.findByIdAndUpdate(req.params.id, {$set: req.body},
    function (err, code) {
      if (err) {
        res.send(err);      // There's an error! Alert the client!
        console.error(err); // There's an error! Alert us!
      } else {
        res.send({
          message: "Code updated!"
        });
      }
    });
}

exports.delete = function (req, res) {
  Code.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.send(err);      // There's an error! Alert the client!
      console.error(err); // There's an error! Alert us!
    } else {
      res.send({
        message: "Code deleted!"
      });
    }
  });
  // TODO: make it so that when a code is deleted, it is removed from
  // the associated student's inventory
}
