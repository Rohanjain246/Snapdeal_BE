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
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
