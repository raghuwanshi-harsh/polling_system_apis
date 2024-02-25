const mongoose = require('mongoose');

// question schema
questionSchema = new mongoose.Schema({
    title : {
        type: String
    },
    options: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'options'
        },
    ],
})

// create a new question model
const Question = mongoose.model('question',questionSchema);

module.exports = Question;