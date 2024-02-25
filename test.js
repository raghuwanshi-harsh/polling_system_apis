const express = require('express');
const bodyParser = require('body-parser');
const Question = require('./model/questionSchema');

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Your routes and other middleware go here...

// Example route using your createQuestion function
app.post('/questions/create', async (req, res) => {
  const { question } = req.body;
  if (question) {
    // CREATING QUESTION
    console.log(req.body)
    const response = await Question.create({ Question: question });
    if (response) {
      return res.status(200).send(response);
    } else {
      return res.status(400).send(err);
    }
  } else {
    return res.status(406).send("please provide some context");
  }
});

// Start the server
const port = 8000; // Choose your desired port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
