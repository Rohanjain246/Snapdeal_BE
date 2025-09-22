const express = require("express");
const router = express.Router();
const Product = require("../Models/productModel");
const ProductDetails = require("../Models/productDetailsModel");
const verifyToken = require("../Auth/verifyToken");

router.get("/products", async (req, resp) => {
  const productDetails = await Product.find().lean();

  const products = productDetails.map(({ _id, ...rest }) => rest);

  resp.json(products);
});

// ➕ Add new product
router.post("/productSave", async (req, res) => {
  try {
    const product = new ProductDetails(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✏️ Update product
router.patch("/productUpdate/:id", async (req, res) => {
  try {
    console.log(req.body, "req.body");
    const updatedProduct = await ProductDetails.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      { $set: req.body },
      { new: true, upsert: false }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ Delete product
router.delete("/productDelete/:id", async (req, res) => {
  try {
    const deletedProduct = await ProductDetails.deleteOne({
      id: parseInt(req.params.id),
    });
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
