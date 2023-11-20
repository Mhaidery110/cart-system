const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const product = require("./model/Product");
const productRoute = require("./routes/productRoutes.js");
const userRoute = require("./routes/userRoutes.js");
const orderRoute = require("./routes/orderRoute.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/products/", productRoute);
app.use("/api/users/", userRoute);
app.use("/api/orders/", orderRoute);

app.get("/", (req, res) => {
  res.send("showing data");
});

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://mhaidery110:muntazir@muntazir.00dxwie.mongodb.net/vowelWeb"
    )
    .then(() => {
      console.log("connected to db");
    })
    .catch((error) => {
      console.log(error);
    });
};

app.listen(8000, () => {
  connect();
  console.log("server started at port 8000");
});
