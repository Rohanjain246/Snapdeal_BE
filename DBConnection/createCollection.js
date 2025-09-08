const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  number: {
    type: String,
  },
  email: {
    type: String,
  },
});
userSchema.pre("validate", function (next) {
  if (!this.number && !this.email) {
    this.invalidate("number", "Either number or email is required");
    this.invalidate("email", "Either number or email is required");
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
