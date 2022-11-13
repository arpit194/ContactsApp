const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  toName: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("message", messageSchema);
