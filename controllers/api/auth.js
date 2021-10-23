// express-validator added
// const user = require("../../models/user");
const { validationResult } = require("express-validator");
const User = require("../../models/user");

module.exports.main = (req, res) => {
    return res.send("<h1>hey</h1>");
};

module.exports.test = (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);
};

// create user
module.exports.create_user = function (req, res) {
    const errors = validationResult(req);

    // if errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // check if user email is already registered
    User.findOne({ email: req.body.email }, function (err, user) {
        // technical error
        if (err) {
            console.log(err);
            // TO DO: Add return path
            return;
        }

        // for user's email successfully found in database---->> ALREADY TAKEN!
        if (user) {
            console.log("E-mail already registered!");
            // TO DO: Add return path
            return;
        }

        // if e-mail not found
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log("Error in creating account");
                    console.log(err);
                    // TO DO: Add return path
                    return;
                }
                console.log("Account created successfully!", user);
                // TO DO: Add return path
                return;
            });
        } else {
            console.log("Error in creating account!");
            return res.redirect("back");
        }
    });
};
