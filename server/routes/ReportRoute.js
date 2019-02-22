const express = require('express');
const router = express.Router();

const ReportController = require('../controllers/ReportController');

router.get('/download', ReportController.genReport);

module.exports = router;
