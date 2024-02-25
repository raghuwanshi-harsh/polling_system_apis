const mongoose = require('mongoose');

// option schema
const optionSchema = new mongoose.Schema({
    Questions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question',
    },
    text: {
        type: String,
    },
    votes: {
        type: Number,
        default: 0,
    },
    link_to_vote: {
        type: String,
    }
});

// create a new options model
const Options= mongoose.model('options',optionSchema);

module.exports = Options;