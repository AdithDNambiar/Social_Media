const express = require("express");
const router = express.Router();
const multer = require("multer");

const Story = require("../models/Story");

/* STORAGE CONFIG */

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"uploads/");
  },
  filename:(req,file,cb)=>{
    cb(null, Date.now()+"-"+file.originalname);
  }
});

const upload = multer({storage});

/* CREATE STORY */

router.post("/create", upload.single("photo"), async (req,res)=>{
  try{

    const story = new Story({
      user:req.body.user,
      text:req.body.text || "",
      photo:req.file ? "/uploads/"+req.file.filename : "",
      video:req.body.video || ""
    });

    await story.save();

    res.json(story);

  }catch(err){
    console.log(err);
    res.status(500).json({error:"Story failed"});
  }
});

/* 🔥 MARK STORY AS SEEN (PUT THIS ABOVE) */

router.post("/view/:userId", async (req,res)=>{
  try{

    const userId = req.body.viewerId;

    const stories = await Story.find({
      user:req.params.userId
    });

    for(let story of stories){

      if(!story.viewers.includes(userId)){
        story.viewers.push(userId);
        await story.save();
      }

    }

    res.json({message:"Story marked as seen"});

  }catch(err){
    console.log(err);
    res.status(500).json({error:"View failed"});
  }
});

/* 🔥 GET STORIES (PUT LAST) */

router.get("/:userId", async (req,res)=>{
  try{

    const stories = await Story.find({
      user:req.params.userId
    }).sort({createdAt:1});

    res.json(stories);

  }catch(err){
    console.log(err);
    res.status(500).json({error:"Fetch failed"});
  }
});

module.exports = router;