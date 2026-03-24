const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  text:{
    type:String,
    default:""
  },

  photo:{
    type:String,
    default:""
  },

  video:{
    type:String,
    default:""
  },

  viewers:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }]

},{
  timestamps:true
});

storySchema.index({ createdAt:1},{expireAfterSeconds:86400});

module.exports = mongoose.model("Story", storySchema);