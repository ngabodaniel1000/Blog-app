const User = require("../model/admin");
const mongoose = require("mongoose");
const Post = require("../model/post")
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'deax72mws',
    api_key: '991446557818882',
    api_secret: 'PbfouH4hSnK3EGnSmwqBzcUlZzg'
});

exports.adminlogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if(!req.body.username || !req.body.password) {
            return res.status(400).send("Please provide username and password");
        }

        if (!user) {
            return res.status(400).send("User does not exist");
        }

        if (user.password !== password) {
            return res.status(400).send("Invalid password");
        }

        // Store user data in session
        req.session.userId = user._id;
        req.session.username = user.username;
        req.session.password = user.password;

        console.log("Session data:", req.session); // Debugging line
        res.status(200).send("Account logged in");
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Server error");
    };
}

// Middleware to ensure user is authenticated
exports.ensureAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({message:"Unauthorized to this api"});
    }
};

// Admin signup
exports.adminsignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const finduser = await User.findOne({ username });
        const user = new User({
            username,
            email,
            password
        });
        if(!req.body.username || !req.body.password || !req.body.email) {
            return res.status(400).send("Please provide username, email and password");
        }
        if (finduser) {
            return res.status(400).send("User already exists"); 
        }

        await user.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        res.status(500).send(error);
    }
};

// Admin dashboard (protected route)
exports.dashboard = async (req, res) => {
    try {
      if (req.session.userId) {
        res.json({ loggedIn: true,user:req.session.username,email:req.session.email,userid:req.session.userId });
      } else {
        res.json({ loggedIn: false });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error accessing dashboard', error });
    }
  }
  exports.logout = async (req, res) => {
    try {
      req.session.destroy();
      res.send("Logged out successfully");
    } catch (error) {
      res.status(500).send({ message: 'Error logging out', error });
    }
  }
  
exports.createPost = async(req, res) => {
    try {
        const { posttitle, postcontent, imageUrl } = req.body;
        const userId = req.params.userId;

        if (!postcontent) {
            return res.status(400).json({
                message: "contents are required"
            });
        }

        const post = new Post({
            posttitle: posttitle || "Untitled",
            postcontent,
            imageUrl: imageUrl || null,
            userposted: userId,
            postlikes: 0,
            postcomments: []
        });

        const savedPost = await post.save();
        
        return res.status(201).json({
            message: "Post created successfully",
            post: savedPost
        });
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({
            message: "Error creating post",
            error: error.message
        });
    }
};

exports.getPostDetails = async (req, res) => {
    try {
        const { postId } = req.params;
        console.log("Received postId:", postId);

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            // return res.status(400).send("Invalid post ID format");
        }

        const post = await Post.findById(postId)
            .populate('userposted', 'username email');

        if (!post) {
            return res.status(404).send("Post not found");
        }

        res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).send(error);
    }
};
exports.getallposts = async(req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const key = req.query.key;
    try {
        if (key) {
            const posts = await Post.find({
                $or: [
                    { posttitle: { $regex: key, $options: "i" } },
                    { postcontent: { $regex: key, $options: "i" } },
                ]
            })
            .populate('userposted', 'username email')
            .limit(limit)
            .sort({ _id: -1 });
            res.status(200).json({ posts });
        } else {
            const posts = await Post.find()
            .populate('userposted', 'username email')
            .limit(limit)
            .sort({ _id: -1 });
            res.status(200).json({ posts });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
exports.getmypost = async(req,res)=>{
    const id = req.query.userid
    try {
        const mypost = await Post.find({userposted:req.session.userId})
            .populate('userposted', 'username email');
            res.status(200).json({mypost});
    } catch (error) {
        res.status(500).send(error);
    }
}
exports.gettopposts = async(req,res)=>{
    try {
        const limit = parseInt(req.query.limit) || 10;
        const posts = await Post.find().limit(limit).sort({ postlikes: -1 })
        res.status(200).json({posts});
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.session.userId; // Get current user's ID from session
        
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).send("Invalid post ID format");
        }

        const post = await Post.findById(postId);
        
        if (!post) {
            return res.status(404).send("Post not found");
        }

        // Check if user has already liked the post
        if (post.likedBy && post.likedBy.includes(userId)) {
            return res.status(200).json({ message: "You have already liked this post", likes: post.postlikes });
        }

        // Add user to likedBy array and increment likes count
        post.likedBy = post.likedBy || [];
        post.likedBy.push(userId);
        post.postlikes = (post.postlikes || 0) + 1;
        await post.save();

        res.status(200).json({ message: "Post liked successfully", likes: post.postlikes });
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).send(error);
    }
};

exports.addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        const userId = req.session.userId;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).send("Invalid post ID format");
        }

        const post = await Post.findById(postId);
        
        if (!post) {
            return res.status(404).send("Post not found");
        }

        // Initialize postcomments array if it doesn't exist
        post.postcomments = post.postcomments || [];
        // Add new comment
        post.postcomments.push({
            content,
            userId,
            username: req.session.username,
            createdAt: new Date()
        });

        await post.save();
        res.status(201).json({ 
            message: "Comment added successfully", 
            comments: post.postcomments 
        });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).send(error);
    }
};
