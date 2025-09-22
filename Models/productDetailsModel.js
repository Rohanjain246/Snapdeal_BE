const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  img: String,
  price: String,
  oldPrice: String,
  highlights: [String],
  specifications: {
    countryOfOrigin: String,
    commonName: String,
  },
  description: String,
  seller: {
    name: String,
    rating: Number,
    storeLink: String,
  },
  category: String,
  subCategory: String,
  brand: String,
  rating: Number,
  reviews: [
    {
      user: String,
      comment: String,
      stars: Number,
    },
  ],
  recommendations: Number,
  sizes: Array,
  colors: Array,
  id: Number,
});

const ProductDetails = mongoose.model(
  "ProductDetails",
  productSchema,
  "productDetails"
);

module.exports = ProductDetails;
