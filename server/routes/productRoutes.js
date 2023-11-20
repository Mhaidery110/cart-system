const express = require("express");
const router = express.Router();
const Product = require("../model/Product.js");

router.get("/getProducts", async (req, res, next) => {
  try {
    Product.find({}).then((pro) => {
      res.send(pro);
    });
  } catch (error) {
    res.status(400).json({ messege: error });
  }
});

router.post("/createProduct", async (req, res, next) => {
  const { name, variant, prices, category, img, desc } = req.body;
  const newProduct = new Product({
    name,
    variant,
    prices,
    category,
    img,
    desc,
  });

  try {
    await newProduct.save();
    res.status(200).json("product created succesfully");
  } catch (error) {
    res.status(500).json({ messesge: error });
  }
});

module.exports = router;
