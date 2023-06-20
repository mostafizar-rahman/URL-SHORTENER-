const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    mainURL: {
      type: String,
      required: true,
      // unique: [true, "You can not provide same url multiple time"],
    },
    hostURL: {
      type: String,
      required: true,
    },
    deviceId: {
      type: String,
    },
    vistHistory: [{ timeStamp: { type: Number } }],
  },
  { timestamps: true }
);

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
