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
      photo:req.file ? "/uploads/"+req.file.filename : ""

    });

    await story.save();

    res.json(story);

  }catch(err){

    console.log(err);
    res.status(500).json({error:"Story failed"});

  }

});

/* GET STORY OF USER */

router.get("/:userId", async (req,res)=>{

  try{

    const story = await Story.findOne({
      user:req.params.userId
    }).sort({createdAt:-1});

    res.json(story);

  }catch(err){

    console.log(err);
    res.status(500).json({error:"Fetch failed"});

  }

});

module.exports = router;