import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const Email = mongoose.model("Email", emailSchema);

export default Email;
