import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    qId: {
      type: String,
      unique: true,
      require: true,
    },
    course: {
      type: String,
      require: true,
      enum: ["B.Tech", "BCA", "MCA", "Other"],
    },
    sessionYear: {
      type: String,
      require: true,
      enum: ["1st", "2nd", "3rd", "4th"],
    },
    section: {
      type: String,
      require: true,
    },
    branch: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    profilePicture: {
      type: String,
      require: true,
    },
    transactionId: {
      type: String,
    },
    transactionStatus: {
      type: String,
      require: true,
      enum: ["pending", "successful", "cash", "upi"],
    },
    gender: {
      type: String,
      require: true,
      enum: ["Male", "Female", "Other"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
