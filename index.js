const express = require("express");
const port = 8000;
const cookieParser = require("cookie-parser");
// const expressLayouts = require("express-ejs-layouts");
// connect to db
const db = require("./config/mongoose");
const User = require("./models/user");

// app.use(expressLayouts);

// used for session cookie
const session = require("express-session");

// require passport
const passport = require("passport");

const passportLocal = require("./config/passport-local-strategy");

var MongoDBStore = require("connect-mongodb-session")(session);
const app = express();
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

app.listen(port, () => {
    console.log("Server is up and running");
});
