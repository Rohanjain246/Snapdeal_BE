const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const app = express();
app.use(express.json());
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

let otpStore = {};

router.post("/send", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is required" });
    }

    const otp = generateOTP();
    otpStore[phone] = otp;

    await client.messages.create({
      body: `Your WhatsApp OTP is ${otp}`,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:+91${phone}`,
    });

    console.log(`✅ OTP for ${phone}: ${otp}`);
    res.status(200).json({ success: true, message: "OTP sent via WhatsApp" });
  } catch (error) {
    console.log("error --->", error);
    console.error("❌ Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

router.post("/verify", (req, res) => {
  const { phone, enteredOtp } = req.body;

  if (!phone || !enteredOtp) {
    return res
      .status(400)
      .json({ success: false, message: "Phone and OTP required" });
  }

  if (otpStore[phone] && otpStore[phone] === enteredOtp) {
    delete otpStore[phone];
    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  }

  res.status(400).json({ success: false, message: "Invalid or expired OTP" });
});

module.exports = router;
