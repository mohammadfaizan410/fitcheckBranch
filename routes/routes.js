const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Readable } = require("stream");
const bodyParser = require("body-parser");

// ------- mongo db connection --------
mongoose.connect("mongodb://localhost:27017/fitcheckDB");
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
      /* const listings = {
        name: "",
        description: "",
        category: "",
        size: "",
        brand: "",
        condition: "",
        packagesize: "",
        price: "",
        images: [],
      };
      const fitcheck = {
        likes: 0,
        caption: "",
        listings: [listings],

        videos: [],
      }; */

      const newUser = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
        fitcheck: [],
        password: req.body.password,
        images: [],
        bio: "",
        followers: [],
        following: [],
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
  const query = { username: req.body.username, password: req.body.password };
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
    const userId = user._id;
    const fitcheckId = req.body.fitcheckid;
    const listingId = req.body.listingid;
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

    await User.updateOne(
      {
        _id: userId,
        "fitcheck._id": fitcheckId,
        "fitcheck.listings._id": listingId,
      },
      {
        $push: {
          "fitcheck.$[fitcheckElem].listings.$[listingElem].images": fileData,
        },
      },
      {
        arrayFilters: [
          {
            "fitcheckElem._id": fitcheckId,
          },
          {
            "listingElem._id": listingId,
          },
        ],
      }
    );

    res.status(200).json({
      message: "Image saved successfully! file id: " + fileData.filename,
      filename: fileData.filename,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving image" });
  }
});

// define a route for handling fitcheck uploads
router.post("/uploadfitcheck", async (req, res) => {
  try {
    // decode the base64-encoded image data to a buffer
    const buffer = Buffer.from(req.body.video, "base64");

    const uniqueFilename = await generateUniqueFilename(
      req.body.username,
      bucket
    );
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
      contentType: "image/jpeg",
    };

    const updatedUser = await User.findOneAndUpdate(
      { username: req.body.username }, // Find user by username
      {
        $push: {
          fitcheck: {
            likes: "0",
            caption: req.body.caption,
            listings: [],
            video: fileData,
          },
        },
      }, // Push a new fitcheck object to the fitcheck array
      { new: true } // Return the updated user object
    );
    const fitcheckId =
      updatedUser.fitcheck[updatedUser.fitcheck.length - 1]._id;

    console.log(fitcheckId);

    res.status(200).json({
      message: "Video saved successfully! file id: " + fileData.filename,
      filename: fileData.filename,
      fitcheckId: fitcheckId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving video" });
  }
});

// GET request handler for getting images by filenames
router.post("/getallfitcheck", async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const fitchecks = user.fitcheck;
    res.status(200).json(fitchecks);
  } catch (error) {
    res.status(500).json({ message: "Error getting Fitchecks" });
  }
});

// GET request handler for getting images by filenames
router.post("/getallfitcheckdata", async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const fitchecks = user.fitcheck;
    const filenames = fitchecks.map((fitcheck) => fitcheck.video.filename);
    const likes = fitchecks.map((fitcheck) => fitcheck.likes);
    const ids = fitchecks.map((fitcheck) => fitcheck._id);
    const captions = fitchecks.map((fitcheck) => fitcheck.caption);

    const videos = [];

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
        const videoData = {
          filename: filenames[i],
          caption: captions[i],
          likes: likes[i],
          id: ids[i],
          contentType: file[0].contentType,
          data: buffer.toString("base64"),
        };
        videos.push(videoData);

        if (videos.length === filenames.length) {
          res.status(200).json(videos);
        }
      });

      stream.on("error", (error) => {
        console.log(error);
        res.status(500).json({ message: "Error downloading file" });
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting Fitchecks" });
  }
});

//GET Single Fitcheck
router.post("/getfitcheckdata", async (req, res) => {
  try {
    const username = req.body.username;
    const fitcheckId = req.body.fitcheckId;
    const user = await User.findOne({ username: username });
    const fitcheck = await user.fitcheck.find(
      (fitcheck) => fitcheck._id == fitcheckId
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (!fitcheck) {
      res.status(404).json({ message: "Fitcheck not found" });
      return;
    }

    const filename = fitcheck.video.filename;
    const likes = fitcheck.likes;
    const id = fitcheck._id;
    const caption = fitcheck.caption;

    const file = await bucket.find({ filename: filename });
    const data = [];

    const stream = bucket.openDownloadStreamByName(filename);
    const chunks = [];

    stream.on("data", (chunk) => {
      chunks.push(chunk);
    });

    stream.on("end", () => {
      const buffer = Buffer.concat(chunks);
      const fitcheckData = {
        filename: filename,
        caption: caption,
        likes: likes,
        id: id,
        contentType: file.contentType,
        data: buffer.toString("base64"),
      };

      data.push(fitcheckData);

      res.status(200).json({ message: "Success", fitcheck: data[0] });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

//Add Followers
router.post("/addfollower", async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({ username: username });
    const follower = req.body.follower;

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.followers.push(follower);
    await user.save();

    res.status(200).json({ message: "Success: Follower Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Adding Follower" });
  }
});

//GET Likes
router.post("/getLikes", async (req, res) => {
  try {
    const username = req.body.username;
    const fitcheckId = req.body.fitcheckId;
    const user = await User.findOne({ username: username });
    const fitcheck = await user.fitcheck.find(
      (fitcheck) => fitcheck._id == fitcheckId
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (!fitcheck) {
      res.status(404).json({ message: "Fitcheck not found" });
      return;
    }

    const likes = fitcheck.likes;

    res.status(200).json({ message: "Success", likes: likes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

//SET Likes
router.post("/addLikes", async (req, res) => {
  try {
    const username = req.body.username;
    const fitcheckId = req.body.fitcheckId;
    const user = await User.findOne({ username: username });
    const fitcheck = await user.fitcheck.find(
      (fitcheck) => fitcheck._id == fitcheckId
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (!fitcheck) {
      res.status(404).json({ message: "Fitcheck not found" });
      return;
    }

    const newLikes = parseInt(fitcheck.likes) + 1;

    await User.findOneAndUpdate(
      { username: username, "fitcheck._id": fitcheckId },
      { $set: { "fitcheck.$.likes": newLikes.toString() } },
      { new: true }
    );

    res.status(200).json({ message: "Sucess", likes: newLikes.toString() });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
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
