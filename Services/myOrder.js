const express = require("express");
const router = express.Router();
const MyOrder = require("../Models/myOrderModel");

router.post("/myOrder", async (req, resp) => {
  try {
    const myOrder = await MyOrder.insertMany(req.body);
    console.log(myOrder, "myorder");

    resp
      .status(200)
      .json({ success: true, message: "My order Stored Successfully!!!" });
  } catch (e) {
    console.log(e, "e");
    resp.status(500).json({ success: true, message: "Some thing went Wrong" });
  }
});

router.get("/fetchOrder", async (req, resp) => {
  try {
    const orders = await MyOrder.find().lean();

    resp.status(200).json(orders);
  } catch (e) {
    console.log(e, "e");
    resp.status(500).json("Something Went Wrong!!");
  }
});

router.patch("/updateOrderStatus", async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res
        .status(400)
        .json({ message: "orderId and status are required" });
    }

    // update only if order exists (no upsert)
    const updatedOrder = await MyOrder.findOneAndUpdate(
      { orderId: orderId },
      { $set: { status: status } },
      { new: true, upsert: false } // 🔒 prevents creating new document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
