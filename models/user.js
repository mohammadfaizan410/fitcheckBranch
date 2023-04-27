const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  size: {
    type: String,
  },
  brand: {
    type: String,
  },
  condition: {
    type: String,
  },
  packagesize: {
    type: String,
  },
  price: {
    type: String,
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

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  username: {
    type: String,
  },
});

const fitcheckSchema = new mongoose.Schema({
  likes: {
    type: [String],
  },
  caption: {
    type: String,
  },
  comments: {
    type: [commentSchema],
  },
  listings: {
    type: [listingSchema],
  },
  video: {
    filename: String,
    contentType: String,
    uploadDate: Date,
    caption: String,
    size: Number,
    postername: String,
  },
});

const fitcheckCollectionSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    required: true,
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    required: true,
    type: String,
  },
  phonenumber: {
    required: true,
    type: String,
  },
  avatar: {
    filename: String,
    contentType: String,
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
  items: {
    required: false,
    default: [],
    type: [String],
  },
  solditems: {
    required: false,
    default: [],
    type: [String],
  },
  activity: {
    required: false,
    default: [],
    type: [String],
  },
  bio: {
    required: false,
    default: "",
    type: String,
  },
  fitcheck: {
    type: [fitcheckSchema],
  },
  avatar: {
    filename: String,
    contentType: String,
    uploadDate: Date,
    caption: String,
    size: Number,
  },
});

module.exports = mongoose.model(
  "fitcheckcollections",
  fitcheckCollectionSchema
);
