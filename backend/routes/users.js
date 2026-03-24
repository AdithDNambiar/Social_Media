const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Story = require("../models/Story"); // ✅ ADD THIS

// GET ALL USERS WITH STORY STATUS
router.get("/", async (req, res) => {
  try {

    const currentUserId = req.query.userId; // 👈 send from frontend

    const users = await User.find();

    const updatedUsers = await Promise.all(
      users.map(async (u) => {

        // get all stories of this user
        const stories = await Story.find({ user: u._id });

        const hasStory = stories.length > 0;

        // check if ALL stories are seen
        const storySeen = hasStory
          ? stories.every(story =>
              story.viewers.includes(currentUserId)
            )
          : false;

        return {
          ...u._doc,
          hasStory,
          storySeen
        };

      })
    );

    res.json(updatedUsers);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET SINGLE USER
router.get("/:id", async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    res.json(user);

  } catch (err) {
    console.log("ERROR:",err.message);
    res.status(500).json({message:"Server error"});
  }
});

module.exports = router;