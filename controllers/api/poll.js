// display all polls page --> then divided in 2 sections: created and participated
module.exports.polls = async (req, res) => {
    return res.json({
        polls: "no poll available",
    });
};

// display created polls
module.exports.createdPolls = async (req, res) => {
    return res.json([]);
};

// display participated polls
module.exports.participatedPolls = async (req, res) => {
    return res.json([]);
};
