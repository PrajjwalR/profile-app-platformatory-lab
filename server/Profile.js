const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  phone: String,
  city: String,
  pincode: String,
});

module.exports = mongoose.model("Profile", ProfileSchema);
