import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema({
  phone: {
    type: String,
    unique: true,
    require: true,
  }
});

const Phone = mongoose.model("Phone", phoneSchema);

export default Phone;
