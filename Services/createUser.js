const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");

router.post("/checkLogin", async (req, res) => {
  const { number, email } = req.body;
  try {
    const filterValue = number ? { number } : { email };
    const existingUser = await User.findOne({ ...filterValue });
    if (existingUser) {
      return res
        .status(309)
        .json({ message: "User already exists", isExistingUser: true });
    }
    res
      .status(404)
      .json({ message: "User does not exists", isExistingUser: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", loggedIn: false });
  }
});

router.post("/createUser", async (req, res) => {
  const { number, email, dob, keepLoggedIn, password, name } = req.body;
  try {
    const newUser = new User({
      number,
      email,
      dob,
      keepLoggedIn,
      password,
      name,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", loggedIn: keepLoggedIn });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", loggedIn: keepLoggedIn });
  }
});
module.exports = router;
