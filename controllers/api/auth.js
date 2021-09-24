// express-validator added
// const user = require("../../models/user");
const { validationResult } = require("express-validator");
const User = require("../../models/user");

module.exports.auth = (req, res) => {
    res.send("<h1>Auth here</h1>");
};

// create user action
// module.exports.create_user = function (req, res) {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ erros: errors.message() });
//     }
//     try {
//         // check if user email is already registered
//         User.findOne({ email: req.body.email });
//     } catch (error) {}
// };
