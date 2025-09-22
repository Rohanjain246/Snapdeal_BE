const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    label: { type: String, default: "home" }, // home, office etc
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    state: { type: String, required: true },
    landmark: { type: String },
    phone: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
