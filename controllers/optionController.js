const Option = require('../model/optionSchema');

// Add votes to the option
const addVote = async (req, res) => {
    const response = await Option.findOne({_id: req.params.id});
    if (response){
        response.votes += 1;
        await response.save();
        return res.status(200).send(response);
    } else {
        res.status(404).send("Server Error Response Not Found");
    }
}

// delete the option if there are no votes
const deleteOption = async (req, res) => {
    const response = await Option.findOne({_id: req.params.id});
    if (response){
        // check if the option has votes
        if (response.votes >= 1){
            return res.status(405).send("Cannot delete a option that has votes");
        }
        await Option.deleteOne({_id: req.params.id});
        return res.status(200).send(response);
    } else {
        res.status(404).send("Server Error Response Not Found");
    }
}


module.exports.addVote = addVote;
module.exports.deleteOption = deleteOption;