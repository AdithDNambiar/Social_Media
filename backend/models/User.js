const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  email:{
    type:String,
    required:true,
    unique:true
  },

  bio:{
    type:String,
    default:""
  },

  password:{
    type:String,
    required:true
  },

  profilePic:{
    type:String,
    default:""
  },

  bio:{
    type:String,
    default:""
  },

  followers:[
    {
      type:String
    }
  ],

  following:[
    {
      type:String
    }
  ],

  savedPosts:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Post"
    }
  ]

},{timestamps:true});

module.exports = mongoose.model("User",UserSchema);