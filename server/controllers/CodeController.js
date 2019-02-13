const Code = require('../models/CodeModel');

exports.create = function (req, res) {
  var query = Code.create({
    book: req.body.book,
    student: req.body.student ? req.body.student : null
  });

  query.then((code) => {
    res.status(200).send(code);
  })

  query.catch((err) => {
    res.status(500).json(err);
  });
}

exports.readAll = function (req, res) {
  var query = Code.find({});

  query.then((codes) => {
    res.status(200).send(codes);
  });

  query.catch((err) => {
    return res.status(500).json(err);
  });
}

exports.readSingle = function (req, res) {
  var query = Code.findOne({ _id: req.params.id });

  query.then((code) => {
    if (code) {
      res.status(200).send(code);
    } else {
      res.status(404).send({
        message: "Code not found",
        id: req.params.id
      });
    }
  });

  query.catch((err) => {
    return res.status(500).json(err);
  });
}

exports.update = function (req, res) {
  var query = Code.findOne({ _id: req.params.id });

  query.then(async(code) => {
    if (code) {
      await code.update({ $set: req.body });
      res.status(200).send({
        message: "Code updated",
        id: code.id,
        changes: req.body
      });
    } else {
      res.status(404).send({
        message: "Code not found",
        id: req.params.id
      });
    }
  });

  query.catch((err) => {
    return res.status(500).json(err);
  });
}

exports.delete = function (req, res) {
  var query = Code.findOne({ _id: req.params.id });

  query.then(async (code) => {
    if (code) {
      await code.remove();
      res.status(200).send({
        message: "Code deleted"
      });
    } else {
      res.status(400).send({
        message: "Code not found"
      });
    }
  });

  query.catch((err) => {
    res.status(500).json(err)
  });
}
