const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const session = require("express-session"); // Torsdag
const passport = require("passport");
// Passport config
require("./passport")(passport);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization, Origin, X-Requested-With");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
  }
  next();
});

// Express Session // Torsdag
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize()); // Torsdag
app.use(passport.session()); // Torsdag

//CONTROLLERS
app.use("/api/users", require("./controllers/usersController"));
app.use("/api/products", require("./controllers/productsController"));

module.exports = app;
