const express = require('express');
const router = express.Router();

const CodeController = require('../controllers/CodeController');

router.post('/create', CodeController.create);    // CREATE!

router.get('/:id', CodeController.read);          // READ!

router.put('/:id/update', CodeController.update)  // UPDATE!

router.delete('/:id/delete', CodeController.delete); // DESTROY!

// What does that spell? C R U D! CRUD! CRUD! CRUD!

module.exports = router;
