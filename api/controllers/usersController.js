const route = require("express").Router();
const userModel = require("../models/user/userModel.js");

// route.get("/register");

// route.get("/login");

// Handle Register
route.post("/register", userModel.registerUser);

route.post("/login", userModel.loginUser);

module.exports = route;
