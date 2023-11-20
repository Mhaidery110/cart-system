// import mongoose from "mongoose";
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require,
    },
    variant: [],
    prices: [],
    category: { type: String, require },
    img: { type: String, require },
    desc: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
