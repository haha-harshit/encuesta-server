const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

// connect to db
const db = require("./config/mongoose");

// used for session cookie
const session = require("express-session");

// require passport
const passport = require("passport");

const passportLocal = require("./config/passport-local-strategy");

const User = require("./models/user");

// middleware-> json-body-parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// set route
app.use("/", require("./routes/index"));

// routing to API
app.use("/api", require("./routes/api/index"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/poll", require("./routes/api/poll"));

// app.get("/", (req, res) => {
//     return res.send("Home page");
// });

app.set("view engine", "ejs");
app.set("views", "./views");

// session config
app.use(
    session({
        name: "encuesta",
        // TODO change secret before depolyment in production mode
        secret: "blahsomething",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: null,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
    console.log("Server is up and running");
});
