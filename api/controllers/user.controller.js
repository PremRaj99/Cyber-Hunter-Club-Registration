import Email from "../models/email.model.js";
import Phone from "../models/phone.model.js";
import User from "../models/user.model.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "", // Replace with your Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET || "", // Replace with your Razorpay Key Secret
});

export const create = async (req, res) => {
  try {
    const {
      name,
      qId,
      course,
      sessionYear,
      section,
      email,
      gender,
      branch,
      profilePicture,
      phoneNumber,
    } = req.body;
    if (qId.length !== 8) {
      res.status(400).json("Q.ID should be of 8 digits");
    }
    if (phoneNumber.length !== 10) {
      res.status(400).json("Phone Number should be of 10 digits");
    }

    const ifQIdexist = await User.findOne({ qId });

    if (ifQIdexist) {
      return res.status(400).json("Q.Id already exist!");
    }

    const ifEmailexist = await User.findOne({ email });

    if (ifEmailexist) {
      return res.status(400).json("Email already exist!");
    }

    const ifPhoneexist = await User.findOne({ phoneNumber });

    if (ifPhoneexist) {
      return res.status(400).json("Phone number already exist!");
    }

    // verifying RazorPay transaction
    const { amount, currency, receipt } = req.body;
    const options = {
      amount: amount * 100, // Amount in paise (INR)
      currency: currency,
      receipt: receipt,
    };

    const order = await razorpay.orders.create(options);

    // code here
    if(order) {

      const newRegistration = new User({
        name,
        qId,
        course,
        sessionYear,
        section,
        email,
        phoneNumber,
        gender,
        branch,
        profilePicture,
        transactionId: order.id,
        transactionStatus: "pending",
      });
  
      const data = await newRegistration.save();
  
      if (data) {
        res.status(200).json({ data: order });
      } else {
        res.status(400).json(data.message);
      }
    }
    else {
      res.status(400).json('Internal server error! Try again sometime.');
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const verifyPayment = async (req, res) => {
  const { paymentId, orderId, signature } = req.body;
  try {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature === signature) {
      const user = await User.findOne({ transactionId: orderId });
      if (!user) {
        res
          .status(400)
          .json(
            "Your registration is not done. Please contact Cyber Hunter Club"
          );
      }
      user.transactionStatus = "successful";
      await user.save();
      res.status(200).json({ status: "success" });
    } else {
      res.status(400).json({ status: "failed" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const test = (req, res) => {
  res.status(400).json("api is working.");
};
