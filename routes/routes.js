const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Readable } = require("stream");
const bodyParser = require("body-parser");

// ------- mongo db connection --------
mongoose.connect("mongodb://localhost:27018/fitcheckDB");
const database = mongoose.connection; //get the database object from mongoose connection

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected: " + database.name);
});

// ------- mongo db connection --------

// create GridFS instance
const { GridFSBucket } = require("mongodb");
let bucket;
database.once("open", () => {
  bucket = new GridFSBucket(database.db, {
    bucketName: "uploads",
  });
  console.log("GridFS Connected");
});

//generate unique file name
async function generateUniqueFilename(username, bucket) {
  let isUnique = false;
  let filename;
  while (!isUnique) {
    // Generate a random number and append it to the username
    const randomNumber = Math.floor(Math.random() * 1000000);
    filename = `${username}_${randomNumber}`;

    // Check if the filename is unique in the GridFS bucket collection
    const file = await bucket.find({ filename }).toArray();
    if (file.length === 0) {
      isUnique = true;
    }
  }
  return filename;
}

//handle Register
router.post("/register", async (req, res) => {
  User.findOne({ email: req.body.email }).then(async (result) => {
    if (!result) {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
      });

      try {
        const dataToSave = await newUser.save();
        res.status(200).json(dataToSave);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } else {
      res.status(400).json({ message: "User already exists!" });
    }
  });
});

//Handle Login
router.post("/login", async (req, res) => {
  const query = { email: req.body.email, password: req.body.password };
  User.find(query).then(async (result) => {
    if (!result) {
      // user not found

      res.status(400).json({ message: "Username Not Found" });
    } else {
      const token = jwt.sign({ email: req.body.email }, "secretKey");
      res.status(200).json({ message: result, token: token });
    }
  });
});

// define a route for handling image uploads
router.post("/imageupload", async (req, res) => {
  try {
    // find the user object in the database using the username in req.body
    const user = await User.findOne({ username: req.body.username });
    const caption = req.body.caption;

    // decode the base64-encoded image data to a buffer
    const buffer = Buffer.from(req.body.image, "base64");

    const uniqueFilename = await generateUniqueFilename(user.username, bucket);
    // upload the buffer to GridFS
    const uploadStream = bucket.openUploadStream(uniqueFilename);
    const readStream = new Readable();
    readStream.push(buffer);
    readStream.push(null);
    readStream.pipe(uploadStream);

    // save the file metadata to the images array of the user object
    const fileID = uploadStream.id.toString();
    const fileData = {
      id: fileID,
      filename: uniqueFilename,
      caption: caption,
      contentType: "image/jpeg",
    };
    user.images.push(fileData);
    await user.save();

    res.status(200).json({
      message: "Image saved successfully! file id: " + fileData.filename,
      filename: fileData.filename,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving image" });
  }
});

// GET request handler for getting images by filenames
router.post("/getimages", async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const filenames = user.images.map((image) => image.filename);
    const fileCaptions = user.images.map((image) => image.caption);

    const images = [];

    for (let i = 0; i < filenames.length; i++) {
      const file = await bucket.find({ filename: filenames[i] }).toArray();

      if (file.length === 0) {
        res.status(404).json({ message: `File ${filenames[i]} not found` });
        return;
      }

      const stream = bucket.openDownloadStreamByName(filenames[i]);
      const chunks = [];

      stream.on("data", (chunk) => {
        chunks.push(chunk);
      });

      stream.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const imageData = {
          filename: filenames[i],
          caption: fileCaptions[i],
          contentType: file[0].contentType,
          data: buffer.toString("base64"),
        };
        images.push(imageData);

        if (images.length === filenames.length) {
          res.send(images);
        }
      });

      stream.on("error", (error) => {
        console.log(error);
        res.status(500).json({ message: "Error downloading file" });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting images" });
  }
});

module.exports = router;
