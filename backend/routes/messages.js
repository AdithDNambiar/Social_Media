const router = require("express").Router();
const mongoose = require("mongoose");
const Message = require("../models/Message");


// SEND MESSAGE
router.post("/send", async(req,res)=>{

  try{

    const sender = new mongoose.Types.ObjectId(req.body.sender);
    const receiver = new mongoose.Types.ObjectId(req.body.receiver);

    const msg = new Message({
      sender: sender,
      receiver: receiver,
      text: req.body.text
    });

    await msg.save();

    res.json(msg);

  }catch(err){

    console.log(err);
    res.status(500).json({error:"Message send failed"});

  }

});


// LOAD CHAT BETWEEN TWO USERS
router.get("/:user1/:user2", async(req,res)=>{

  try{

    const user1 = new mongoose.Types.ObjectId(req.params.user1);
    const user2 = new mongoose.Types.ObjectId(req.params.user2);

    const msgs = await Message.find({

      $or:[
        { sender:user1, receiver:user2 },
        { sender:user2, receiver:user1 }
      ]

    })
    .sort({createdAt:1});

    res.json(msgs);

  }catch(err){

    console.log(err);
    res.status(500).json({error:"Chat load failed"});

  }

});

module.exports = router;