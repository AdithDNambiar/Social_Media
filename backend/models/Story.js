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
  }

},{
  timestamps:true
});

module.exports = mongoose.model("Story", storySchema);