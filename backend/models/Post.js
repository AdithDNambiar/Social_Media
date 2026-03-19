const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  likes:{
  type:[String],
  default:[]
},

  text:String,

  photo:String,

  video:String,

  pollOptions:[String],

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("Post",PostSchema);