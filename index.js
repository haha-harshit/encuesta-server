const express = require("express");
const port = 8000;
const cors = require("cors");
// import express layouts
const expressLayouts = require("express-ejs-layouts");
const app = express();

// enable cors
app.use(cors());

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

const cookieParser = require("cookie-parser");
// connect to db
const db = require("./config/mongoose");
const User = require("./models/user");

// static files
app.use(express.static("./assets"));

// use expressLayouts
app.use(expressLayouts);

// app.set("layout", "./views/layout");

// used for session cookie
const session = require("express-session");

// require passport
const passport = require("passport");

// require passpotr-local strategy
const passportLocal = require("./config/passport-local-strategy");

// require passpotr-JWT strategy
const passportJWT = require("./config/passport-jwt-strategy");

var MongoDBStore = require("connect-mongodb-session")(session);
var store = new MongoDBStore(
    {
        uri: "mongodb://localhost/encuesta_development",
        databaseName: "encuesta_development",
        // mongooseConnection: db,
        // autoRemove: "disabled",
    },
    function (err) {
        if (err) {
            console.log(err, "error");
        }
    }
);

store.on("error", function (err) {
    console.log(err);
});

// middleware-> json-body-parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// set route
// app.use("/", require("./routes/index"));

// app.get("/", (req, res) => {
//     return res.send("Home page");
// });

app.set("view engine", "ejs");
app.set("views", "./views");

// session config
// mongoStore is used to store the session cookie in the db
app.use(
    session({
        name: "encuesta",
        secret: "blahsomething",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: null,
        },
        store: store,
    })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// routing to API
app.use("/api", require("./routes/api/index"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/poll", require("./routes/api/poll"));
app.use("/api/user", require("./routes/api/user"));

app.listen(port, () => {
    console.log("Server is up and running");
});
