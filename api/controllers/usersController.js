const route = require('express').Router();
const User = require('../models/user/userModel.js');
const UserSchema = require('../models/user/userSchema');
const passport = require('passport');

// route.get("/register");

// route.get("/login");

// Handle Register
route.post('/register', User.registerUser);

route.post('/login', passport.authenticate('local'), (req, res) => {
  if (req.user) {
    const { password, ...user } = req.user._doc;
    res.json(user);
  } else {
    res.json({ error: "couldn't find the user" });
  }
});

route.get('/', (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
});

module.exports = route;
