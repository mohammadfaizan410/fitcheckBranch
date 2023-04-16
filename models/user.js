const mongoose = require("mongoose");

const fitcheckCollectionSchema = new mongoose.Schema({
  fullname: {
    required: false,
    type: String,
    default: "",
  },
  email: {
    required: true,
    type: String,
  },
  username: {
    required: false,
    type: String,
    default: "",
  },
  password: {
    required: true,
    type: String,
  },
  followers: {
    required: false,
    default: [],
    type: [String],
  },
  following: {
    required: false,
    default: [],
    type: [String],
  },
  bio: {
    required: false,
    default: "",
    type: String,
  },
  videos: {
    required: false,
    type: [String],
  },
  images: [
    {
      filename: String,
      contentType: String,
      uploadDate: Date,
      caption: String,
      size: Number,
    },
  ],
});

module.exports = mongoose.model(
  "fitcheckcollections",
  fitcheckCollectionSchema
);
