import { useState, useRef } from "react";
import "../pages/CreatePost.css";
import Sidebar from "../components/Sidebar";
import axios from "axios";

export default function CreatePost() {

  const [text, setText] = useState("");

  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [file,setFile] = useState(null);

  const [showPoll, setShowPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const photoInput = useRef();
  const videoInput = useRef();

  const user = JSON.parse(localStorage.getItem("user"));

const createPost = async () => {

  if(text === "" && !file) return;

  const formData = new FormData();

  formData.append("user", user._id);
  formData.append("text", text);

  if(photo){
    formData.append("photo", file);
  }

  if(video){
    formData.append("video", file);
  }

  await axios.post(
    "http://localhost:3000/posts/create",
    formData
  );

  alert("✅ Successfully Posted!");

  setText("");
  setPhoto(null);
  setVideo(null);
  setFile(null);

};

  // PHOTO UPLOAD
const handlePhotoUpload = (e) => {

  const selected = e.target.files[0];
  if (!selected) return;

  setPhoto(URL.createObjectURL(selected)); // preview
  setFile(selected);                       // upload file
  setVideo(null);

};


  // VIDEO UPLOAD
 const handleVideoUpload = (e) => {

  const selected = e.target.files[0];
  if (!selected) return;

  setVideo(URL.createObjectURL(selected));
  setFile(selected);
  setPhoto(null);

};

  // POLL OPTION CHANGE
  const handlePollChange = (index, value) => {

    const updated = [...pollOptions];
    updated[index] = value;
    setPollOptions(updated);

  };


  // ADD POLL OPTION
  const addPollOption = () => {

    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, ""]);
    }

  };


  return (
    <div className="appLayout">

      <Sidebar />

      <div className="pageContent">

        <div className="createPostPage">

          <h1 className="title">Create a Post</h1>

          <div className="createPostCard">

            



            {/* INPUT AREA */}

            <div className="inputArea">

              <img
                className="avatar"
                src={user?.profilePic || "https://i.imgur.com/HeIi0wU.png"}
                alt="avatar"
              />

              <textarea
                placeholder={`What's on your mind, ${user?.name || "User"}?`}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              

            </div>



            {/* PHOTO PREVIEW */}

            {photo && (
              <img
                src={photo}
                className="mediaPreview"
                alt="preview"
              />
            )}



            {/* VIDEO PREVIEW */}

            {video && (
              <video
                controls
                className="mediaPreview"
              >
                <source src={video} />
              </video>
            )}



            {/* POLL CREATOR */}

            {showPoll && (

              <div className="pollBox">

                <h3>Create Poll</h3>

                {pollOptions.map((opt, index) => (

                  <input
                    key={index}
                    placeholder={`Option ${index + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handlePollChange(index, e.target.value)
                    }
                  />

                ))}

                {pollOptions.length < 4 && (
                  <button
                    className="addPollBtn"
                    onClick={addPollOption}
                  >
                    Add Option
                  </button>
                )}

              </div>

            )}



            {/* ADD TO POST */}

            <div className="addSection">

              <h3>Add to your post</h3>

              <div className="addGrid">


                {/* PHOTO */}

                <div
                  className="addCard"
                  onClick={() => photoInput.current.click()}
                >

                  <div className="addIcon">📷</div>

                  <div className="addContent">

                    <div className="addTitle">Photo</div>

                    <div className="addDesc">
                      Upload image
                    </div>

                  </div>

                </div>

                <input
                  type="file"
                  accept="image/*"
                  ref={photoInput}
                  style={{ display: "none" }}
                  onChange={handlePhotoUpload}
                />



                {/* VIDEO */}

                <div
                  className="addCard"
                  onClick={() => videoInput.current.click()}
                >

                  <div className="addIcon">🎥</div>

                  <div className="addContent">

                    <div className="addTitle">Video</div>

                    <div className="addDesc">
                      Upload video
                    </div>

                  </div>

                </div>

                <input
                  type="file"
                  accept="video/*"
                  ref={videoInput}
                  style={{ display: "none" }}
                  onChange={handleVideoUpload}
                />



                {/* POLL */}

                




              </div>

            </div>



            {/* BUTTONS */}

            <div className="postActions">

              <button
  className="postBtn"
  onClick={createPost}
>
Post
</button>

              

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}