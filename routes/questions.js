const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post('/create', questionController.createQuestion); // create a new question
router.get('/:id', questionController.fetchQuestion); // get the question
router.post("/:id/options/create", questionController.createOptions); // create a new options for the question
router.delete("/:id/delete", questionController.deleteQuestion); // delete the question if no option is liked


module.exports = router;   
