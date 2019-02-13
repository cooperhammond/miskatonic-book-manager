const Book = require('../models/BookModel');

exports.create = function (req, res) {
  var query = Book.create({
    title: req.body.title,
    author: req.body.author
  });

  query.then((book) => {
    res.status(200).send(book);
  });

  query.catch((err) => {
    res.status(500).json(err);
  });
}

exports.readAll = function (_, res) {
  var query = Book.find({});

  query.then((books) => {
    res.status(200).send(books);
  });

  query.catch((err) => {
    return res.status(500).json(err);
  });
}

exports.readSingle = function (req, res) {
  var query = Book.findOne({ _id: req.params.id });

  query.then((book) => {
    if (book) {
      res.status(200).send(book);
    } else {
      res.status(404).send({
        message: "Book not found",
        id: req.params.id
      });
    }
  });

  query.catch((err) => {
    return res.status(500).json(err);
  });
}

exports.update = function (req, res) {
  var query = Book.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body });

  query.then((book) => {
    if (book) {
      res.status(200).send(book);
    } else {
      res.status(404).send({
        message: "Book not found",
        id: req.params.id
      });
    }
  });

  query.catch((err) => {
    return res.status(500).json(err);
  });
}

exports.delete = function (req, res) {
  var query = Book.findOne({ _id: req.params.id });

  query.then(async (book) => {
    if (book) {
      await book.remove();
      res.status(200).send({
        message: "Book deleted",
      });
    } else {
      res.status(404).send({
        message: "Book not found"
      });
    }
  });

  query.catch((err) => {
    res.status(500).json(err);
  });
}
