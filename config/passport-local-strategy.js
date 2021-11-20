const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.use(
    new LocalStrategy(
        {
            usernamefield: "email",
        },
        function (email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    console.log("Error in finding user", err);
                    return done(err);
                }
                if (!user || user.password != password) {
                    console.log("Invalid Username/Password");
                    return done(null, false);
                }

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
passport.checkAuthentication = function(req, res, next){
    
}

module.exports = passport;
