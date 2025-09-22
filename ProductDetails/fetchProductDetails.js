const express = require("express");
const router = express.Router();
const ProductDetails = require("../Models/productDetailsModel");
const verifyToken = require("../Auth/verifyToken");

router.get("/productDetails", async (req, resp) => {
  const { category, brand, minPrice, maxPrice, minRating, sort } = req.query;

  // Build query object
  let filter = {};

  if (category) filter.category = category;
  if (brand) filter.brand = brand;
  if (minRating) filter.rating = { $gte: Number(minRating) };

  // Price range
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = minPrice;
    if (maxPrice) filter.price.$lte = maxPrice;
  }
  let sortOption = {};
  if (sort === "priceHighLow") sortOption.price = -1; // descending
  else if (sort === "priceLowHigh") sortOption.price = 1; // ascending
  else if (sort === "popularity") sortOption.rating = -1;
  else if (sort === "newest") sortOption.createdAt = -1;
  const productDetails = await ProductDetails.find(filter)
    .sort(sortOption)
    .lean();

  const products = productDetails.map(({ _id, ...rest }) => rest);

  resp.json(products);
});

module.exports = router;
