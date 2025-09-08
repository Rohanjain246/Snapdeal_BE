const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const generateToken = require("./Auth/generateToken");
const connectDB = require("./DBConnection/DBConnection");

const cors = require("cors");
app.use(cors());
const VerifyLogin = require("./Services/verifyLogin");
const CreateUser = require("./Services/createUser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use("/api", generateToken);
app.use("/api", VerifyLogin);
app.use("/api", CreateUser);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
