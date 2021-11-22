const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        function (req, email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                // if (user) {
                //     console.log("user found");
                // }
                if (err) {
                    console.log("Error in finding user", err);
                    return done(err);
                }
                if (!user || user.password != password) {
                    console.log("Invalid Username/Password");
                    return done(null, false);
                }
                // if (user.password != password) {
                //     console.log("Pass mismatch");
                // }
                // console.log(password);
                // console.log(user.password);
                // if (user.password != password) {
                //     console.log("pass bhul gyi");
                // }
                // console.log("enter here");
                // console.log(user);
                return done(null, user);
            });
        }
    )
);

// serializing user to decide which key is to be set in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// deserializing the user from the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("error: ", err);
            return done(err);
        }
        return done(null, user);
    });
});

// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
    // if user signed in, pass the request on next function
    if (req.isAuthenticated()) {
        return next();
    }

    // if not signed in
    return res.redirect("/api/auth/log-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current logged-in user from the session cookie and sending it to the locals for view
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;
