const Poll = require("../../models/poll");

const { body } = require("express-validator");

// display all polls page --> then divided in 2 sections: created and participated
module.exports.polls = async (req, res) => {
    const polls = await Poll.find({ poll: req.user.id });
    res.json(polls);
};

// display created polls
module.exports.createdPolls = async (req, res) => {
    return res.json([]);
};

// display participated polls
module.exports.participatedPolls = async (req, res) => {
    return res.json([]);
};

// create a poll
module.exports.addPoll = async (req, res) => {
    return;
};
