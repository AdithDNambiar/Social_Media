import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import "./Comments.css";

function Comments({ postId, user, onClose }) {

    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    const loadComments = async () => {

        const res = await axios.get(
            "http://localhost:3000/posts/comments/" + postId
        );

        setComments(res.data);

    };

    useEffect(() => {
        loadComments();
    }, []);

    const addComment = async () => {

        if (!text) return;

        await axios.post(
            "http://localhost:3000/posts/comments",
            {
                postId: postId,
                userId: user._id,
                text: text
            }
        );

        setText("");
        loadComments();

    };

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

    return ReactDOM.createPortal(

        <div className="commentPopup">

            <div className="commentBox">

                <div className="commentHeader">

                    <h3>Comments</h3>

                    <button onClick={onClose}>✖</button>

                </div>

                <div className="commentList">

                    {comments.map((c) => (
                        <div key={c._id} className="commentItem">

                            <img
                                src={c.userId?.profilePic || "https://i.imgur.com/HeIi0wU.png"}
                                alt="profile"
                            />

                            <div className="commentText">

                                <b>{c.userId?.name || "User"}</b>

                                <span>{c.text}</span>
                                
                                <div className="commentTime">
                                    {timeAgo(c.createdAt)}
                                </div>

                            </div>

                        </div>
                    ))}

                </div>

                <div className="commentInput">

                    <input
                        placeholder="Write a comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <button onClick={addComment}>
                        Post
                    </button>

                </div>

            </div>

        </div>,

        document.body

    );

}

export default Comments;