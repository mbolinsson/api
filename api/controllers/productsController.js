const route = require("express").Router();
const productModel = require("../models/product/productModel.js");

//Postar nya produkter till DB
route.post("/import", productModel.addProducts);

//Hämtar alla produkter
route.get("/", productModel.getProducts);

route.get("/:id", productModel.getProductById);

module.exports = route;
