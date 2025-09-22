const express = require("express");
const Address = require("../Models/addressCardModel");
const User = require("../Models/userModel");

const router = express.Router();

/**
 * ✅ Get all addresses for a user by username
 */
router.get("/address/:username", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = await Address.find({ userId: user._id });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * ✅ Add a new address (expects username in body)
 */
router.post("/saveAddress", async (req, res) => {
  try {
    const { username, ...addressData } = req.body;

    const user = await User.findOne({ name: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAddress = new Address({ ...addressData, userId: user._id });
    const savedAddress = await newAddress.save();

    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * ✅ Update an address by ID
 */
router.put("/updateAddress/:id", async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json(updatedAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * ✅ Delete an address by ID
 */
router.delete("/deleteAddress/:id", async (req, res) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(req.params.id);
    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
