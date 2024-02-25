const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');

router.post("/:id/add_vote", optionController.addVote); // add a vote
router.delete("/:id/delete", optionController.deleteOption); // delete option if not voted or liked

module.exports = router;   