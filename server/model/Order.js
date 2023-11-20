const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, require },
    email: { type: String, require },
    userId: { type: String, require },
    orderItems: [],
    shippingAddress: { type: Object },
    orderAmount: { type: Number, require },
    isDelivered: { type: Boolean, require, default: false },
    transactionId: { type: String, require },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
