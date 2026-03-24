import React,{useState,useEffect} from "react";
import axios from "axios";

import "./Home.css";
import "../Layout.css";

import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";

function Home(){

  const [posts,setPosts] = useState([]);
  const [text,setText] = useState("");
  const [file,setFile] = useState(null);
  const [users,setUsers] = useState([]);
  const [openStoryCreator,setOpenStoryCreator] = useState(false);
const [selectedStory,setSelectedStory] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const openProfile = (id) => {
  window.location.href = "/profile/" + id;
};
  
  const openStory = async (u) => {

  console.log("CLICKED USER:", u);

  try{

    await axios.post(
      "http://localhost:3000/stories/view/" + u._id,
      { viewerId: user._id }
    );

    const res = await axios.get(
      "http://localhost:3000/stories/" + u._id
    );

    console.log("STORY RESPONSE:", res.data);

    setSelectedStory(res.data[0]);

    loadUsers();

  }catch(err){
    console.log("ERROR FULL:", err.response);
  }

};

const postStory = async () => {

  const formData = new FormData();

  formData.append("user", user._id);
  formData.append("text", text);

  if(file){
    formData.append("photo", file);
  }

  await axios.post(
    "http://localhost:3000/stories/create",
    formData
  );

  alert("Story Posted ✅");

  setText("");
  setFile(null);
  setOpenStoryCreator(false);

};
  // LOAD POSTS
  const loadPosts = async () => {

    const res = await axios.get("http://localhost:3000/posts");

    setPosts(res.data);

  };

  // LOAD USERS
  const loadUsers = async () => {

    const res = await axios.get("http://localhost:3000/users?userId="+ user._id);

    setUsers(res.data);

  };

  // CREATE POST
 const createPost = async () => {

  if(text === "" && !file) return;

  const formData = new FormData();

  formData.append("user", user._id);
  formData.append("text", text);

  if(file){
    formData.append("photo", file);
  }

  await axios.post(
    "http://localhost:3000/posts/create",
    formData
  );

  setText("");
  setFile(null);

  loadPosts();

};

  useEffect(()=>{

    loadPosts();
    loadUsers();

  },[]);

return(

<div className="appLayout">

  <Sidebar/>

  <div className="pageContent">

    <div className="feedContainer">

      {/* STORIES */}
      <div className="storiesBar">

  {/* YOUR STORY FIRST */}
  <div
    className="storyItem"
    onClick={()=>openStory(user)}
  >
    <img
  className="storyCircle"
  src={user.profilePic || "https://i.imgur.com/HeIi0wU.png"}
/>
    <span className="storyName">You</span>
  </div>

  {/* OTHER USERS */}
  {users.map((u)=>{

    if(u._id === user._id) return null;

    return(
      <div
        key={u._id}
        className="storyItem"
        onClick={()=>openStory(u)}
      >
        <img
  className={`storyCircle 
    ${!u.hasStory ? "noStory" : ""}
    ${u.hasStory && !u.storySeen ? "unseenStory" : ""}
    ${u.hasStory && u.storySeen ? "seenStory" : ""}
  `}
  src={u.profilePic || "https://i.imgur.com/HeIi0wU.png"}
/>
        <span className="storyName">{u.name}</span>
      </div>
    );

  })}

  {/* ADD BUTTON LAST */}
  <div
    className="storyItem"
    onClick={()=>setOpenStoryCreator(true)}
  >
    <div className="storyCircle plus">+</div>
    <span className="storyName">Add</span>
  </div>

</div>

      {/* CREATE POST */}

      <div className="createPost">

        <div className="createTop">

          <img src={"https://i.imgur.com/HeIi0wU.png"} alt=""/>

          <input
placeholder="What's on your mind?"
value={text}
onChange={(e)=>setText(e.target.value)}
/>



        </div>

        <div className="createActions">

          <span>      </span>
          <span>      </span>
          <span>      </span>
          <span>      </span>

          <button onClick={createPost}>
            Share
          </button>

        </div>

      </div>

      {/* POSTS */}

      

      <Feed
      posts={posts}
      refresh={loadPosts}
      user={user}
      />

      {selectedStory && (
  <div className="storyPopup" onClick={()=>setSelectedStory(null)}>

    <div className="storyContent">

      {/* IMAGE */}
      {selectedStory.photo && (
        <img
          src={"http://localhost:3000"+selectedStory.photo}
        />
      )}

      {/* VIDEO */}
      {selectedStory.video && (
        <video controls autoPlay>
          <source src={"http://localhost:3000"+selectedStory.video}/>
        </video>
      )}

      {/* TEXT */}
      {selectedStory.text && (
        <div className="storyText">
          {selectedStory.text}
        </div>
      )}

    </div>

  </div>
)}

{openStoryCreator && (
  <div
  className="storyPopup"
  onClick={()=>setOpenStoryCreator(false)}  // 👈 CLOSE ON OUTSIDE CLICK
>

  <div
    className="storyContent"
    onClick={(e)=>e.stopPropagation()}  // 👈 PREVENT INSIDE CLICK
  >

      {/* PREVIEW AREA */}
      {file ? (
        file.type.startsWith("image") ? (
          <img src={URL.createObjectURL(file)} />
        ) : (
          <video controls autoPlay>
            <source src={URL.createObjectURL(file)} />
          </video>
        )
      ) : (
        <div className="storyTextPreview">
          {text || "Your story preview"}
        </div>
      )}

      {/* TEXT INPUT */}
      <textarea
        className="storyInputOverlay"
        placeholder="Write something..."
        value={text}
        onChange={(e)=>setText(e.target.value)}
      />

      {/* HIDDEN FILE INPUT */}
      <input
        type="file"
        ref={(el)=>window.storyFileInput = el}
        style={{display:"none"}}
        onChange={(e)=>setFile(e.target.files[0])}
      />

      {/* BOTTOM BAR */}
      <div className="storyBottomBar">

        <button
          className="addFileBtn"
          onClick={()=>window.storyFileInput.click()}
        >
          + Add File
        </button>

        <button
          className="postStoryBtn"
          onClick={postStory}
        >
          POST
        </button>

      </div>

    </div>

  </div>
)}


    </div>


    {/* RIGHT SIDE */}

    <div className="rightPanel">

      <div className="card">

        <h4>People</h4>

        {users.map((u)=>{

          if(u._id === user._id) return null;

          return(

            <div
  className="person"
  key={u._id}
  onClick={()=>openProfile(u._id)}
>

              <img src={u.profilePic || "https://i.imgur.com/HeIi0wU.png"} alt=""/>

              <span onClick={()=>openProfile(u._id)}>
  {u.name}
</span>

            </div>

          );

        })}

      </div>

    </div>

  </div>

</div>

);

}

export default Home;