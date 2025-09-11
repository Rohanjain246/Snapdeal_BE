const express = require("express");
const router = express.Router();
const Product = require("../Models/productModel");
const verifyToken = require("../Auth/verifyToken");

router.get("/products", verifyToken, async (req, resp) => {
  const productDetails = await Product.find().lean();

  const products = productDetails.map(({ _id, ...rest }) => rest);

  resp.json(products);
});

module.exports = router;
