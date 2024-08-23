import Email from "../models/email.model.js";
import Phone from "../models/phone.model.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const ifexist = await User.findOne({ email });

    if (ifexist) {
      return res.status(400).json("Email already exists!");
    }

    // Generate a random verification code
    const verificationCode = crypto.randomBytes(4).toString("hex");

    // Send email using NodeMailer
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or your preferred email service
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Your verification code is: ${verificationCode}`,
    };

    transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to send verification email",
          error: err.message,
        });
      }

      // Save the email and verification code in the database
      const newMail = new Email({ email, verificationCode });
      const data = await newMail.save();

      if (data) {
        res
          .status(200)
          .json("Verification email sent. Please check your inbox.");
      } else {
        res.status(400).json("Failed to save verification details.");
      }
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Find the email document with the provided email
    const emailDoc = await Email.findOne({ email });

    if (!emailDoc) {
      return res.status(400).json("Email not found!");
    }

    // Check if the code matches
    if (emailDoc.verificationCode === code) {
      // Update the document to mark it as verified
      emailDoc.verified = true;
      await emailDoc.save();

      res.status(200).json("Email verified successfully!");
    } else {
      res.status(400).json("Invalid verification code.");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const verifyPhone = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber || phoneNumber.length !== 10) {
      res.status(400).json("phone number should be of 10 digits");
    }

    const ifexist = await User.findOne({ phoneNumber });

    if (ifexist) {
      return res.status(400).json("Phone number already exist!");
    }

    const newPhone = new Phone({ phone: phoneNumber });
    const data = await newPhone.save();
    if (data) {
      res.status(200).json("verifyed");
    } else {
      res.status(400).json("Fail to verify your phone number. Please Try Again!");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
