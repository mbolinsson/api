const LocalStrategy = require("passport-local").Strategy;
// const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// const User = require("./models/user/userModel");
const User = require("./models/user/userSchema"); // Rick Stockholm

module.exports = function(passport) {
  console.log("passport is happening");

  passport.use(
    new LocalStrategy({usernameField: "email"}, (email, password, done) => {
      // Check email
      User.findOne({email: email})
        .then(user => {
          if (!user) {
            return done(null, false, {message: "Can´t find this email"});
          }

          // Check password
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;

            if (isMatch) {
              return done(null, user);
            } else done(null, false, {massage: "incorrect password"});
          });
        })
        .catch(err => console.log(err));
    })
  );

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
    // where is this user.id going? Are we supposed to access this anywhere?
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
