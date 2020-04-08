const mongoose = require("mongoose");
const Product = require("./productSchema");

exports.addProducts = (req, res) => {
  try {
    for (current of req.body) {
      let product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: current.name,
        description: current.description,
        shortDescription: current.shortDescription,
        image: current.image,
        details: current.details,
        shipping: current.shipping,
        inStockAmount: current.inStockAmount,
        price: current.price
      });

      product.save();
    }

    return res.status(200).json();
  } catch {
    return res.status(400).json();
  }
};

exports.getProducts = (req, res) => {
  Product.find({}).then(products => {
    res.send(products);
  });
};

exports.getProductById = (req, res) => {
  Product.findOne({_id: req.params.id}).then(product => {
    res.status(200).json(product);
  });
};
