const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY || "your_jwt_secret";

const authVerify = (req, resp, next) => {
  if (!req.headers.authorization) {
    return resp.status(401).json({ error: "Unauthorized request" });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token || token === "null") {
    return resp.status(401).json({ error: "Unauthorized request" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return resp.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authVerify;
