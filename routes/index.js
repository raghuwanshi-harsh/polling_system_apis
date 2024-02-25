const express = require('express');
const router = express.Router();

console.log('router loaded');

router.use('/questions',require('./questions')); // routes for questions
router.use('/options',require('./options')); // routes for options

module.exports = router;