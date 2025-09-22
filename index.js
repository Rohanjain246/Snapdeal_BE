const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const generateToken = require("./Auth/generateToken");
const connectDB = require("./DBConnection/DBConnection");
const generateOtp = require("./OtpValidation/generateOtp");
const fetchProduct = require("./ProductDetails/fetchProduct");

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const VerifyLogin = require("./Services/verifyLogin");
const CreateUser = require("./Services/createUser");
const payment = require("./Payment_Gateway/payment");
const productDetails = require("./ProductDetails/fetchProductDetails");
const verifyPasswordAndMail = require("./Services/verifyPassAndMail");
const myorder = require("./Services/myOrder");
const filterByCategory = require("./ProductList/filteredProductDetails");
const addressCard = require("./Services/addressRoutes");

connectDB();
app.use("/api", generateToken);
app.use("/api", VerifyLogin);
app.use("/api", CreateUser);
app.use("/api", generateOtp);
app.use("/api", fetchProduct);
app.use("/api", payment);
app.use("/api", productDetails);
app.use("/api", verifyPasswordAndMail);
app.use("/api", myorder);
app.use("/api", filterByCategory);
app.use("/api", addressCard);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
