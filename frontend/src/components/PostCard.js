import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostCard.css";
import Comments from "./Comments";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiSend, FiBookmark } from "react-icons/fi";
import { BsBookmarkFill } from "react-icons/bs";

function PostCard({ post, refresh, user }) {

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  const likes = post.likes || [];
  const liked = likes.includes(user._id);

  // ✅ SET INITIAL SAVED STATE (CORRECT WAY)
  useEffect(() => {
    if (user?.savedPosts) {
      const isSaved = user.savedPosts
        .map(id => String(id))
        .includes(String(post._id));

      setSaved(isSaved);
    }
  }, [user, post._id]);

  // LIKE
  const toggleLike = async () => {
    await axios.post(
      "http://localhost:3000/posts/like/" + post._id,
      { userId: user._id }
    );

    refresh();
  };

  // LOAD COMMENTS
  const loadComments = async () => {
    const res = await axios.get(
      "http://localhost:3000/posts/comments/" + post._id
    );
    setComments(res.data);
  };

  const openComments = () => {
    loadComments();
    setShowComments(true);
  };

  // ADD COMMENT
  const addComment = async () => {
    if (text === "") return;

    await axios.post(
      "http://localhost:3000/posts/comments",
      {
        postId: post._id,
        userId: user._id,
        text: text
      }
    );

    setText("");
    loadComments();
  };

  // TIME FORMAT
  const timeAgo = (date) => {
    if (!date) return "";

    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = [
      { label: "y", seconds: 31536000 },
      { label: "mo", seconds: 2592000 },
      { label: "d", seconds: 86400 },
      { label: "h", seconds: 3600 },
      { label: "m", seconds: 60 }
    ];

    for (const i of intervals) {
      const count = Math.floor(seconds / i.seconds);
      if (count >= 1) {
        return count + i.label + " ago";
      }
    }

    return "just now";
  };

  // 🔥 SAVE / UNSAVE
  const toggleSave = async (postId) => {
    try {
      const res = await axios.put(
        "http://localhost:3000/posts/save/" + postId,
        { userId: user._id }
      );

      const updatedUser = {
        ...user,
        savedPosts: res.data
      };

      // ✅ update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // ✅ instant UI update
      setSaved(!saved);

      // ✅ notify other components (like Saved page)
      window.dispatchEvent(new Event("savedUpdated"));

    } catch (err) {
      console.log("Save error:", err);
    }
  };

  return (
    <div className="postCard">

      {/* HEADER */}
      <div className="postHeader">

        <img
          src={post.user?.profilePic || "https://i.imgur.com/HeIi0wU.png"}
          alt="profile"
          className="postAvatar"
        />

        <div className="postUserInfo">
          <span className="postName">
            {post.user?.name}
          </span>
        </div>

        <span className="postTime">
          {timeAgo(post.createdAt)}
        </span>

      </div>

      {/* TEXT */}
      {post.text && (
        <p className="postText">
          {post.text}
        </p>
      )}

      {/* IMAGE */}
      {post.photo && (
        <img
          src={"http://localhost:3000" + post.photo}
          alt=""
          className="postImage"
        />
      )}

      {/* VIDEO */}
      {post.video && (
        <video controls className="postVideo">
          <source src={post.video} />
        </video>
      )}

      {/* ACTIONS */}
      <div className="postActions">

        {/* LIKE */}
        <button
          onClick={toggleLike}
          className={liked ? "likedBtn" : ""}
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
          <span>{likes.length}</span>
        </button>

        {/* COMMENT */}
        <button onClick={openComments}>
          <FaRegComment />
        </button>

        {/* SHARE */}
        <button>
          <FiSend />
        </button>

        {/* SAVE */}
        <button onClick={() => toggleSave(post._id)}>
          {saved ? (
            <BsBookmarkFill style={{ color: "#2563eb" }} />
          ) : (
            <FiBookmark />
          )}
        </button>

      </div>

      {/* COMMENTS */}
      {showComments && (
        <Comments
          postId={post._id}
          user={user}
          onClose={() => setShowComments(false)}
        />
      )}

    </div>
  );
}

export default PostCard;