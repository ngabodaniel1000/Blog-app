const mongoose = require("mongoose")
const db = mongoose.connect('mongodb://localhost:27017/ref')
.then(() => {
    console.log('db is connected');
}).catch((err) => {
    console.log(err);
});

const PostSchema = new mongoose.Schema({
    posttitle: {
        type: String,
        required: true,
        unique: false
    },
    postcontent: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    postlikes: {
        type: Number,
        default: 0,
        
    },
    postcomments: [{
        content: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    userposted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});


const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
