const express = require("express");
const router = express.Router();
const ProductDetails = require("../Models/productDetailsModel");

router.get("/filterByCategory", async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    const pipeline = [
      { $match: { category } },
      {
        $facet: {
          colors: [
            { $unwind: "$colors" },
            { $group: { _id: "$colors.name", count: { $sum: 1 } } },
            { $project: { name: "$_id", count: 1, _id: 0 } },
            { $sort: { count: -1 } },
          ],
          brands: [
            { $group: { _id: "$brand", count: { $sum: 1 } } },
            { $project: { brand: "$_id", count: 1, _id: 0 } },
            { $sort: { count: -1 } },
          ],
          subCategories: [
            { $group: { _id: "$subCategory", count: { $sum: 1 } } },
            { $project: { subCategory: "$_id", count: 1, _id: 0 } },
            { $sort: { count: -1 } },
          ],
          sizes: [
            { $unwind: "$sizes" },
            { $group: { _id: "$sizes" } },
            { $project: { size: "$_id", _id: 0 } },
            { $sort: { size: 1 } },
          ],
        },
      },
    ];

    const result = await ProductDetails.aggregate(pipeline);

    res.json(result[0]); // return filters
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/filterByQuery", async (req, res) => {
  try {
    const {
      brand,
      color,
      category,
      size,
      minPrice,
      maxPrice,
      rating,
      subCategory,
      sort,
    } = req.query;

    const filter = {};

    // ✅ Brand filter (comma separated: ?brand=Nike,Puma)
    if (brand) {
      const brands = brand.split(",").map((b) => b.trim());
      filter.brand = { $in: brands.map((b) => new RegExp(b, "i")) };
    }

    // ✅ Color filter (comma separated: ?color=Red,Green)
    if (color) {
      const colors = color.split(",").map((c) => c.trim());
      filter["colors.name"] = { $in: colors.map((c) => new RegExp(c, "i")) };
    }
    if (subCategory) {
      const subCategorys = subCategory.split(",").map((b) => b.trim());
      filter.subCategory = { $in: subCategorys.map((b) => new RegExp(b, "i")) };
    }

    // ✅ Category filter
    if (category) {
      filter.category = category;
    }

    // ✅ Size filter (comma separated: ?size=M,L,XL)
    if (size) {
      const sizes = size.split(",").map((s) => s.trim());
      filter.sizes = { $in: sizes };
    }
    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }
    let sortOption = {};
    if (sort === "priceHighLow") sortOption.price = -1; // descending
    else if (sort === "priceLowHigh") sortOption.price = 1; // ascending
    else if (sort === "popularity") sortOption.rating = -1;
    else if (sort === "newest") sortOption.createdAt = -1;

    // ✅ Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await ProductDetails.find(filter).sort(sortOption);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// routes/productRoutes.js
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query; // search text

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Case-insensitive regex
    const searchRegex = new RegExp(q, "i");

    const products = await ProductDetails.find({
      $or: [
        { title: searchRegex },
        { brand: searchRegex },
        { category: searchRegex },
        { subCategory: searchRegex },
      ],
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
