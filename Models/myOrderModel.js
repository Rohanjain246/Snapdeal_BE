const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  id: Number,
  img: String,
  price: String,
  oldPrice: String,
  orderId: String,
  createdDate: Date,
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
  status: String,
  quantity: String,
});

const MyOrder = mongoose.model("MyOrder", productSchema, "myOrders");

module.exports = MyOrder;
