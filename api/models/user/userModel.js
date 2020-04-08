const mongoose = require("mongoose");
// User Model
const User = require("./userSchema");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.registerUser = (req, res) => {
  console.log(req.body);
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  // hashar passet
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;

      // password to hashed
      newUser.password = hash;

      // Save User
      newUser
        .save()
        .then(res.send("hello")) // redirect to LOGIN !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        .catch(err => console.log(err));
    })
  );
};

// exports.loginUser =
//   (passport.authenticate("local"),
//   (req, res) => {
//     console.log(req.user);
//     res.json({name: "req.user.name"});
//   });

exports.loginUser = (req, res, next) => {
  return passport.authenticate("local", {
    successMessage: "Big Seccuess!",
    failureMessage: "Loggin Fail!!"
  })(req, res, next);
};
