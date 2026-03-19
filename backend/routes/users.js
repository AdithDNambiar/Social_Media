const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET ALL USERS
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ✅ ADD THIS
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