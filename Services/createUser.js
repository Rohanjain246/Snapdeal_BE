const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");
require("dotenv").config();
const verifyToken = require("../Auth/verifyToken");

router.post("/createUser", verifyToken, async (req, res) => {
  const { number, email } = req.body;
  try {
    const existingUser = await User.findOne({ number });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ number, email });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
