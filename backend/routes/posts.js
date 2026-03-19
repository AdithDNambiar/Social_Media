const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Notification = require("../models/Notification");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const multer = require("multer");


const storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, "uploads/");
},
filename: function (req, file, cb) {
cb(null, Date.now() + "-" + file.originalname);
}
});

const upload = multer({ storage: storage });

/* ---------------- GET ALL POSTS ---------------- */



router.get("/", async (req,res)=>{

const posts = await Post.find()
.populate("user","name profilePic")
.sort({createdAt:-1});

res.json(posts);

});

/* ---------------- CREATE POST ---------------- */

router.post("/create", upload.single("photo"), async (req,res)=>{

try{

const post = new Post({

user:req.body.user,
text:req.body.text,
photo:req.file ? "/uploads/" + req.file.filename : "",
video:req.body.video || "",
pollOptions:req.body.pollOptions || []

});

await post.save();

/* CREATE NOTIFICATIONS */

const users = await User.find({_id:{$ne:req.body.user}});

for(const u of users){

await Notification.create({

receiver:u._id,
sender:req.body.user,
type:"post",
post:post._id,
text:"posted on ConnectSphere"

});

}

res.json({message:"Post created"});

}catch(err){

console.log(err);
res.status(500).json({error:"Post failed"});

}

});

/* ---------------- LIKE / UNLIKE ---------------- */
router.post("/like/:id", async (req,res)=>{

  const {userId} = req.body;

  const post = await Post.findById(req.params.id);

  if(!post){
    return res.status(404).json({message:"Post not found"});
  }

  // FIX: ensure likes array exists
  if(!post.likes){
    post.likes = [];
  }

  const index = post.likes.indexOf(userId);

  if(index === -1){
    post.likes.push(userId);
  }else{
    post.likes.splice(index,1);
  }

  await post.save();

  if(index === -1 && post.user.toString() !== userId){

await Notification.create({

receiver:post.user,
sender:userId,
type:"like",
post:post._id,
text:"liked your post"

});

}

  res.json(post);

});

router.get("/user/:id", async (req,res)=>{

try{

const posts = await Post.find({
user: req.params.id
})
.populate("user","name profilePic")
.sort({createdAt:-1});

res.json(posts);

}catch(err){

console.log(err);
res.status(500).json({error:"failed"});

}

});

/* ---------------- DELETE POST ---------------- */

router.delete("/:id", async (req,res)=>{

try{

await Post.findByIdAndDelete(req.params.id);

res.json({message:"Post deleted"});

}catch(err){

console.log(err);
res.status(500).json({error:"Delete failed"});

}

});

// SAVE / UNSAVE POST
router.put("/save/:postId", async (req,res)=>{

  try{

    const user = await User.findById(req.body.userId);

    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    const postId = req.params.postId;

    if(user.savedPosts.map(id=>String(id)).includes(String(postId))){
      // 🔥 UNSAVE
      user.savedPosts = user.savedPosts.filter(
        id => String(id) !== String(postId)
      );
    }else{
      // 🔥 SAVE
      user.savedPosts.push(postId);
    }

    await user.save();

    res.json(user.savedPosts);

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }

});

/* ---------------- EDIT POST ---------------- */

router.put("/:id", async (req,res)=>{

try{

const post = await Post.findById(req.params.id);

if(!post){
return res.status(404).json({message:"Post not found"});
}

post.text = req.body.text;

await post.save();

res.json(post);

}catch(err){

console.log(err);
res.status(500).json({error:"Update failed"});

}

});



/* ---------------- GET COMMENTS ---------------- */

router.get("/comments/:postId", async (req,res)=>{

  const comments = await Comment.find({
    postId:req.params.postId
  }).populate("userId","name profilePic");

  res.json(comments);

});

/* ---------------- ADD COMMENT ---------------- */

router.post("/comments", async (req,res)=>{

  const {postId,userId,text} = req.body;

  const comment = new Comment({
    postId,
    userId,
    text
  });

  await comment.save();

  const post = await Post.findById(postId);

  if(post && post.user.toString() !== userId){

    await Notification.create({
      receiver:post.user,
      sender:userId,
      type:"comment",
      post:postId,
      text:"commented on your post"
    });

  }

  res.json(comment);

});

module.exports = router;