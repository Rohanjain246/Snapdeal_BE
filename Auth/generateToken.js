const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY || "your_jwt_secret";
const router = express.Router();

router.get("/token", (req, resp) => {
  jwt.sign({ user: "exampleUser" }, secret, { expiresIn: 100 }, (err, token) => {
    if (err) {
      console.error("Error generating token:", err);
      resp.status(500).json({ error: "Internal Server Error" });
    }
    resp.json({ token });
  });
});

module.exports = router;
