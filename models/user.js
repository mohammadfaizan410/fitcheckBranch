const mongoose = require('mongoose');

const fitcheckCollectionSchema = new mongoose.Schema({
    fullname: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    }
    ,
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    id: {
        required: true,
        type: String
    },
    followers: {
        required: false,
        default: 0,
        type: Number
    },
    following: {
        required: false,
        default: 0,
        type: Number
    },
    bio: {
        required: false,
        default: "" ,
        type: String
    },
    videos: {
        required: false,
        type: [String]
    }
})

module.exports = mongoose.model('fitcheckcollections', fitcheckCollectionSchema)