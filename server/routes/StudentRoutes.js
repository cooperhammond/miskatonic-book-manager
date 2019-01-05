const express = require('express');
const router = express.Router();

const StudentController = require('../controllers/StudentController');

router.post('/create', StudentController.create);    // CREATE!

router.get('/:id', StudentController.read);          // READ!

router.put('/:id/update', StudentController.update)  // UPDATE!

router.delete('/:id/delete', StudentController.delete); // DESTROY!

// What does that spell? C R U D! CRUD! CRUD! CRUD!

module.exports = router;
