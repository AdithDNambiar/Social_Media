const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");

/* GET USER NOTIFICATIONS */

router.get("/:userId", async (req,res)=>{

const notifications = await Notification.find({
receiver:req.params.userId
})
.populate("sender","name profilePic")
.populate("post")
.sort({createdAt:-1});

res.json(notifications);

});

/* MARK AS READ */

router.put("/read/:id", async(req,res)=>{

await Notification.findByIdAndUpdate(
req.params.id,
{read:true}
);

res.json({message:"updated"});

});

module.exports = router;