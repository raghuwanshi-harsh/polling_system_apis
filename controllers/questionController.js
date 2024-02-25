const Question = require("../model/questionSchema");
const Option = require("../model/optionSchema");
const { response } = require("express");

// create a new Question
const createQuestion = async function (req, res){
    console.log("Creating Question");
    const { question } = req.body;
    if (question) {
        // create a new Question
        try {
            const response = await Question.create({ title: question });
            return res.status(200).send(response);
        } catch (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }
    } else {
        return res.status(406).send("please provide some context");
    }
}


// fetch the question 
const fetchQuestion =  async (req, res) => {
    console.log("Fetching Question");
    const paramsContent = req.params.id;
    if (paramsContent) {
        // find the question
        const response = await Question.findOne({ _id: req.params.id }).populate("options"); 
        if (response) {
            return res.status(200).send(response);
        } else {
            return res.status(404).send("Server Error Question not Found");
        }
    } else {
        return res.status(406).send("Question with provided id not found please check the id");
    }
}


// create option for the question
const createOptions = async (req, res) => {
    console.log("Creating options for Question");
    const paramsContent = req.params.id;
    if(paramsContent) {
        // fine question by id
        const question_response = await Question.findOne({ _id: req.params.id }).populate("options");
        if (question_response) {
            const question_id = question_response._id;
            const text = req.body.text;
            if (text) {
                const option_response = await Option.create({
                    Question: question_id,
                    text: text,
                });
                if (option_response){
                    let link_Vote = req.protocol +
                                    "://" +
                                    req.headers.host +
                                    "/options/" +
                                    option_response._id +
                                    "/add_vote";
                    option_response.link_to_vote = link_Vote;
                    // save the option response
                    await option_response.save();
                    question_response.options.push(option_response._id);
                    // save question response
                    await question_response.save();
                    return res.status(200).send(option_response);
                } else {
                    return res.status(500).send("Option not created")
                }
            } else {
                return res.status(406).send("Option not found");
            }
        } else {
            return res.satatus(404).send("Server Error Question Not Found")
        }

    } else {
        return res.status(406).send("Question with provided id not found please check the id")
    }
}


// delete a question with 
const deleteQuestion = async (req, res) => {
    console.log("Delete Question");
    paramsContent = req.params.id
    const check = false;
    if (paramsContent) {
        const response = await Question.findOne({ _id: req.params.id }).populate("options");
        // find the question by id
        if (response){
            let flag = false
            if (response.options.length > 0) {
                for (let option of response.options) {
                    if (option.Vote > 0) {
                        check = true;
                    }
                }
            }
            if (check){
                return res.status(405).send("Question with id cannot be deleted because its Options have votes in it");
            }
            await Option.deleteMany({question: response._id})
            await Question.deleteOne({_id: response._id})
            return res.status(200).send("Question deleted Successfully")
        }else{
            return res.status(500).send("Sever Error / Question Not Found");
        }
    }else{
        return res.status(406).send("Please provide id in params");
    }
}


module.exports.createQuestion= createQuestion;
module.exports.fetchQuestion= fetchQuestion;
module.exports.createOptions= createOptions;
module.exports.deleteQuestion= deleteQuestion;
