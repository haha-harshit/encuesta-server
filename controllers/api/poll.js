const Poll = require("../../models/poll");
const Option = require("../../models/option");
const User = require("../../models/user");
// const { validationResult } = require("express-validator");

// display all polls page --> then divided in 2 sections: created and participated
module.exports.polls = async (req, res) => {
    try {
        const polls = await Poll.find({ poll: req.user.id });
        res.json(polls);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// display created polls
// module.exports.createdPolls = async (req, res) => {
//     let user = await User.findById(req.user._id)
//         .populate("polls")
//         // .populate("options")
//         .populate({
//             path: "options",
//             populate: {
//                 path: "o_description",
//             },
//         });
//     return res.render("my_poll", {
//         title: "Encuesta | My Polls",
//         user: user,
//     });
// };

module.exports.createdPolls = async function (req, res) {
    try {
        let user = await User.findById(req.user.id).populate("polls");
        let options = await Option.find({}).populate("o_description");
        let polls = await Poll.find({}).populate("options").populate("owner");

        // let user = await User.findById(req.user.id).populate(polls);
        // Option.find({});

        return res.render("my_all_polls", {
            title: "Encuesta | My Polls",
            user: user,
            options: options,
            polls: polls,
        });
    } catch (error) {
        console.log("Error", error);
        return;
    }
};

// display participated polls
module.exports.participatedPolls = async (req, res) => {
    return res.json([]);
};

// ACCESS POLL FORM
module.exports.pollForm = async (req, res) => {
    return res.render("poll_form", {
        title: "Encuesta | Poll Form",
    });
};

// create a poll
module.exports.addPoll = async (req, res) => {
    try {
        // destructuring
        // const { description } = req.body.description;
        // const errors = validationResult(req);
        // if errors
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        // const option = new Option({
        //     description: req.body.options,
        // });

        // const poll = new Poll({
        //     description,
        //     options,
        //     owner: req.user.id,
        // });

        let user = await User.findById(req.user.id).populate("polls");
        // console.log(user);

        let option = await Option.create({
            o_description: req.body.o_description,
        });
        // console.log("option created", option);

        let poll = await Poll.create({
            description: req.body.description,
            owner: req.user.id,
            options: option,
        });
        // console.log(req.user.id);
        // poll.options.push(option);
        user.polls.push(poll);
        // console.log(user);
        // poll.owner.push(owner);
        // poll = await poll.populate("owner");
        poll.save();
        user.save();

        // console.log("Poll created!", poll);
        // console.log(req.user.id);

        // const savedPoll = await poll.save();
        // res.json(poll);
        console.log("Poll Description: ", poll.description);
        console.log("Poll Options: ", poll.options.o_description);
        res.render("my_poll", {
            title: "Encuesta | Poll",
            user: user,
            poll: poll,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
};
