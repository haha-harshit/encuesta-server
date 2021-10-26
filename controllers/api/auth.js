// express-validator added
const { validationResult } = require("express-validator");

// const user = require("../../models/user");
const User = require("../../models/user");

// import bcryptjs
const bcrypt = require("bcryptjs");

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
module.exports.create_user = async (req, res) => {
    const errors = validationResult(req);

    // if errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // check if user email is already registered
        let user = await User.findOne({ email: req.body.email });

        // for user's email successfully found in database---->> ALREADY TAKEN!
        if (user) {
            console.log("E-mail already registered!");
            // TO DO: Add return path
            return;
        }

        // if e-mail not found
        if (!user) {
            try {
                // generate a salt
                const salt = await bcrypt.genSalt(10);
                // create secured password
                const secPass = await bcrypt.hash(req.body.password, salt);

                let user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: secPass,
                });
                console.log("Account created successfully!", user);
                res.json(user);
            } catch (err) {
                console.log("Error in creating account");
                console.log(err);
            }
        } else {
            console.log("Error in creating account!");
            return res.redirect("back");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured!");
    }

    // User.findOne({ email: req.body.email }, function (err, user) {
    //     // technical error
    //     if (err) {
    //         console.log(err);
    //         // TO DO: Add return path
    //         return;
    //     }

    //     // for user's email successfully found in database---->> ALREADY TAKEN!
    //     if (user) {
    //         console.log("E-mail already registered!");
    //         // TO DO: Add return path
    //         return;
    //     }

    //     // if e-mail not found
    //     if (!user) {
    //         // generate a salt
    //         const salt = await bcrypt.genSalt(10);

    //         const secPass = await bcrypt.hash(req.body.password, salt);

    //         User.create(
    //             {
    //                 name: req.body.name,
    //                 email: req.body.email,
    //                 password: secPass,
    //             },
    //             function (err, user) {
    //                 if (err) {
    //                     console.log("Error in creating account");
    //                     console.log(err);
    //                     // TO DO: Add return path
    //                     return;
    //                 }
    //                 console.log("Account created successfully!", user);
    //                 // TO DO: Add return path
    //                 return;
    //             }
    //         );
    //     } else {
    //         console.log("Error in creating account!");
    //         return res.redirect("back");
    //     }
    // });
};
