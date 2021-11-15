// express-validator for validating user inputs
const { validationResult } = require("express-validator");

const User = require("../models/user");

// import bcryptjs for hashing passwords
const bcrypt = require("bcryptjs");

// import JWT for creating token for user
var jwt = require("jsonwebtoken");

// JWT_SECRET_key
const JWT_SECRET = "Hahaisagoodboy@10";

module.exports.main = function (req, res) {
    return res.render("main", {
        title: "ENCUESTA-MAIN",
    });
};

module.exports.home = function (req, res) {
    return res.render("home", {
        title: "ENCUESTA-HOME",
    });
};

// signup page FORM
module.exports.sign_up = async (req, res) => {
    return res.render("sign_up");
};

// LOGIN PAGE FORM
module.exports.log_in = async (req, res) => {
    return res.render("log_in");
};

// create user - SIGN UP
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
            console.log("E-mail already registered!", user);
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
};

// LOGIN-USER - create session
module.exports.create_session = async (req, res) => {
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
            console.log("email not found");
            console.log({ email, password });
            return res.status(400).json("Invalid E-mail/Password");
        }

        // if user exists in db
        if (user) {
            console.log("email found in db", req.body.email);
            // compare the password hash in db with password entered, comparison is done internally in bcrypt
            const passwordCompare = await bcrypt.compare(
                password,
                user.password
            );

            // if password mismatch
            if (!passwordCompare) {
                console.log("password sahi nhi h");
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

// get user-details of logged_in user
module.exports.get_user = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
};
