const express = require("express");
const router = express.Router();
const controller = require("../controller/admin");


// Route to handle admin signup
router.post("/adminsignup", controller.adminsignup);

// Route to handle admin login
router.post("/adminlogin", controller.adminlogin);
router.get("/logout", controller.logout);

router.post("/createpost/:userId", controller.ensureAuthenticated, controller.createPost);

// Protected route to handle admin dashboard
router.get("/dashboard",  controller.dashboard);
// Route to get details of a single post by ID
router.get("/post/:postId", controller.getPostDetails);
router.get("/getallposts", controller.getallposts);
router.get("/getuserposts/:userid", controller.getuserposts);
router.get("/getusers", controller.getusers);
router.get("/gettopposts", controller.gettopposts);

router.put('/post/like/:postId', controller.ensureAuthenticated, controller.likePost);
router.get("/post/mypost/:userid", controller.ensureAuthenticated, controller.getmypost);
router.post('/post/:postId/comment',controller.ensureAuthenticated, controller.addComment);




module.exports = router;
