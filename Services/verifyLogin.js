const express = require("express");
const router = express.Router();
const User = require("../DBConnection/createCollection");
const _ = require("lodash");

router.post("/login", async (req, res) => {
  const { number, email } = req.body;
  try {
    const user = await User.findOne({ number });
    if (!user) {
      return res.status(400).json({ message: "Invalid number or email" });
    }
    // const isMatch = _.isEqual(user.email, email);
    // if (!isMatch) {
    //   return res.status(400).json({ message: "Invalid number or email" });
    // }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
