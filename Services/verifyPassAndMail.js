const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");

router.post("/verifyPassword", async (req, resp) => {
  const { password, email } = req.body;

  const userData = await User.find({ email, password }).lean();
  console.log("userData --->", userData);
  if (userData?.length) {
    resp.status(302).json({ message: "User Found", user: userData });
  } else {
    resp.status(404).json({ message: "User not Found" });
  }
});

module.exports = router;
