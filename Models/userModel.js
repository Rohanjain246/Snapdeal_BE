const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  number: {
    type: String,
  },
  email: {
    type: String,
  },
  dob: {
    type: String,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  keepLoggedIn: {
    type: Boolean,
  },
});
// userSchema.pre("validate", function (next) {
//   if (!this.number && !this.email) {
//     this.invalidate("number", "Either number or email is required");
//     this.invalidate("email", "Either number or email is required");
//   }
//   next();
// });

const User = mongoose.model("User", userSchema);
module.exports = User;
