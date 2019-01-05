const Book = require('../models/BookModel');

exports.create = function (req, res) {
  let book = new Book(
    {
      title: req.body.title,
      author: req.body.author
    }
  );

  book.save(function (err) {
    if (err) {
      res.send({
        error: err
      }); // There's an error! Alert the client!
      console.error(err); // There's an error! Alert us!
    } else {
      res.send({
        message: `"${req.body.title}" created successfully!`
      });
    }
  })
}

exports.read = function (req, res) {
  Book.findById(req.params.id, function (err, book) {
    if (err) {
      res.send({
        error: err
      }); // There's an error! Alert the client!
      console.error(err); // There's an error! Alert us!
    } else {
      res.send(book);
    }
  });
}

exports.update = function (req, res) {
  Book.findByIdAndUpdate(req.params.id, {$set: req.body},
    function (err, book) {
      if (err) {
        res.send({
          error: err
        }); // There's an error! Alert the client!
        console.error(err); // There's an error! Alert us!
      } else {
        res.send({
          message: "Book updated!"
        });
      }
    });
}

exports.delete = function (req, res) {
  Book.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.send({
        error: err
      }); // There's an error! Alert the client!
      console.error(err); // There's an error! Alert us!
    } else {
      res.send({
        message: "Book deleted!"
      });
    }
  });
}
