const express = require("express");
const router = express.Router();
const User = require("../model/User.js");

router.post("/register", async (req, res, next) => {
  const { name, email, password, isAdmin } = req.body;

  const newUser = new User({ name, email, password, isAdmin });

  try {
    await newUser.save();
    res.status(200).json("user created succesfully");
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password });
    if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0]._id,
      };
      res.status(200).json(currentUser);
      console.log(currentUser);
    } else {
      res.status(400).json("user login failed");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
