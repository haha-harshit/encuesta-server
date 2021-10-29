const JWT = require("jsonwebtoken");

// JWT_SECRET_key
const JWT_SECRET = "Hahaisagoodboy@10";

const fetchUser = (req, res, next) => {
    // GET the user from JWT token and add id to req object

    const token = req.header("auth-token");
    // if token not present
    if (!token) {
        return res.status(401).send({
            error: "Please authenticate using a valid token",
        });
    }

    try {
        const data = JWT.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(401).send({
            error: "Please authenticate using a valid token",
        });
    }
};

module.exports = fetchUser;
