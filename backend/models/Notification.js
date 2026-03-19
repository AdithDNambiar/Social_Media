const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({

receiver:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

sender:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

type:{
type:String
},

post:{
type:mongoose.Schema.Types.ObjectId,
ref:"Post"
},

text:{
type:String
},

read:{
type:Boolean,
default:false
}

},{timestamps:true});

module.exports = mongoose.model("Notification",NotificationSchema);