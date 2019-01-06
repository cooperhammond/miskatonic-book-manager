const express = require('express');
const router = express.Router();

const BookController = require('../controllers/BookController');

router.post('/create', BookController.create);       // CREATE!

router.get('/', BookController.readAll)
router.get('/:id', BookController.readSingle);       // READ!

router.put('/:id/update', BookController.update)     // UPDATE!

router.delete('/:id/delete', BookController.delete); // DESTROY!

// What does that spell? C R U D! CRUD! CRUD! CRUD!

module.exports = router;
