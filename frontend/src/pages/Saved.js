import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./Saved.css";

function Saved() {

  // ✅ CORRECT STATE INIT
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [posts, setPosts] = useState([]);

  // ✅ LOAD ON FIRST RENDER
  useEffect(() => {
    loadSaved();

    // 🔥 listen for save updates
    const handleUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
      loadSaved();
    };

    window.addEventListener("savedUpdated", handleUpdate);

    return () => {
      window.removeEventListener("savedUpdated", handleUpdate);
    };
  }, []);

  // ✅ LOAD SAVED POSTS
  const loadSaved = async () => {
    try {
      if (!user?._id) return;

      const userRes = await axios.get(
        "http://localhost:3000/users/" + user._id
      );

      const savedIds = userRes.data.savedPosts || [];

      if (savedIds.length === 0) {
        setPosts([]);
        return;
      }

      const postsRes = await axios.get("http://localhost:3000/posts");

      const filtered = postsRes.data.filter(p =>
        savedIds.some(id => String(id) === String(p._id))
      );

      setPosts(filtered);

    } catch (err) {
      console.log("Error loading saved:", err);
    }
  };

  return (
    <div className="savedPage">

      <Sidebar />

      <div className="savedContent">

        <h2 className="savedTitle">Saved Posts</h2>

        <div className="savedGrid">

          {posts.length === 0 ? (
            <p>No saved posts yet</p>
          ) : (
            posts.map(p => (
              <div key={p._id} className="savedCard">

                {p.photo && (
                  <img
                    src={"http://localhost:3000" + p.photo}
                    alt=""
                  />
                )}

                <div className="savedCardContent">
                  <p>{p.text}</p>
                </div>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default Saved;