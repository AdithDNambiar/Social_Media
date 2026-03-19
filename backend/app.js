var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require("mongoose");
const cors = require("cors");

/* ROUTES */
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const postRoutes = require("./routes/posts");
const notificationsRouter = require("./routes/notifications");
const storyRoutes = require("./routes/stories");
const userRoutes = require("./routes/users");

var app = express();

/* ---------- MIDDLEWARE ---------- */

app.use(cors());
app.use(express.json());
app.use("/stories", storyRoutes);
app.use(express.urlencoded({ extended: true }));

app.use("/notifications",notificationsRouter);
app.use("/uploads", express.static("uploads"));

app.use("/users", userRoutes);

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ---------- DATABASE ---------- */

mongoose.connect("mongodb://127.0.0.1:27017/socialmedia")
.then(()=>{
  console.log("MongoDB Connected");
})
.catch((err)=>{
  console.log(err);
});

/* ---------- ROUTES ---------- */

/* authentication */
app.use("/", authRoutes);

/* posts (create / feed / likes / comments) */
app.use("/posts", postRoutes);

/* messaging */
app.use("/messages", messageRoutes);

app.use("/users", userRoutes);

/* ---------- ERROR HANDLER ---------- */

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});

module.exports = app;