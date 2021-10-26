// express-validator for validating user inputs
const { validationResult } = require("express-validator");

const User = require("../../models/user");

// import bcryptjs for hashing passwords
const bcrypt = require("bcryptjs");

// import JWT for creating token for user
var jwt = require("jsonwebtoken");

// JWT_SECRET_key
const JWT_SECRET = "Hahaisagoodboy@10";

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

                const data = {
                    user: {
                        id: user.id,
                    },
                };
                const authtoken = jwt.sign(data, JWT_SECRET);
                // console.log(jwtData);
                // console.log(data.user);
                res.json({ authtoken });
            } catch (err) {
                // console.log("Error in creating account");
                console.log(err);
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
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

// LOGIN-USER
module.exports.login_user = async (req, res) => {
    // if errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        // if email not found in db while logging in
        if (!user) {
            return res.status(400).json("Invalid E-mail/Password");
        }

        // if user exists in db
        if (user) {
            // compare the password hash in db with password entered, comparison is done internally in bcrypt
            const passwordCompare = await bcrypt.compare(
                password,
                user.password
            );

            // if password mismatch
            if (!passwordCompare) {
                return res.status(400).json("Invalid E-mail/Password");
            }

            // if matched
            if (passwordCompare) {
                const data = {
                    user: {
                        id: user.id,
                    },
                };
                const authtoken = jwt.sign(data, JWT_SECRET);
                console.log("logged In success");
                res.json({ authtoken });
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
};
