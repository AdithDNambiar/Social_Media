import React from "react";
import Sidebar from "../components/Sidebar";
import "./Profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { useParams } from "react-router-dom";
import{FiEdit2, FiTrash2} from "react-icons/fi";

function Profile(){
const storedUser=localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser):null;

const [posts,setPosts] = useState([]);
const params = useParams();
const isOwnProfile=!params.id;
const id=isOwnProfile ? user._id:params.id;
const [editingPost,setEditingPost] = useState(null);
const [editText,setEditText] = useState("");
const [profile,setProfile] = useState(null);


const loadPosts = async () => {

const res = await axios.get(
"http://localhost:3000/posts/user/"+id
);

setPosts(res.data);

};

useEffect(()=>{
 loadProfile();
 loadPosts();
},[id]);

/* DELETE POST */

const deletePost = async(id)=>{

const confirmDelete = window.confirm("Delete this post?");

if(!confirmDelete) return;

await axios.delete("http://localhost:3000/posts/"+id);

loadPosts();

};

const loadProfile = async () => {
    if(isOwnProfile){
        setProfile(user);
        return;
    }
try{
  const res = await axios.get("http://localhost:3000/users");
  const foundUser=res.data.find(u=>String(u._id) ===String(id));
if(foundUser){
  setProfile(foundUser);
}else{
    console.log("User not found in list");
    setProfile(user);
}
}catch(err){
    console.log(err);
    setProfile(user);
}
};

/* OPEN EDIT */

const openEdit = (post)=>{

setEditingPost(post._id);
setEditText(post.text);

};

/* SAVE EDIT */

const saveEdit = async()=>{

await axios.put(
"http://localhost:3000/posts/"+editingPost,
{ text: editText }
);

setEditingPost(null);
loadPosts();

};

if(!profile){
    return <div style={{color:"white"}}>Loading profile..</div>;
} 
if(!user){
    return <div style={{color:"white"}}>No user found. Please login again</div>;
}
return(

<div className="profilePage">

<Sidebar/>

<div className="profileMain">

<div className="profileHeader">

<img
  className="profileImage"
  src={profile?.profilePic || "https://i.imgur.com/HeIi0wU.png"}
/>

<div className="profileInfo">

<h2>{profile?.name||profile.username||"User"}</h2>

<p className="profileEmail">
  {profile?.email||""}
</p>

{profile?.bio && (
  <p className="profileBio">{profile.bio}</p>
)}

</div>

</div>

{/* POSTS GRID */}

<div className="profilePosts">

{posts.map((p)=>(

<div key={p._id} className="profilePost">

<div className="postTop">

  <span className="postTime">
    {format(p.createdAt)}
  </span>

  <div className="postRight">
    {isOwnProfile && (
      <div className="postMenu">
        <button onClick={()=>openEdit(p)}>
          <FiEdit2 />
        </button>

        <button onClick={()=>deletePost(p._id)}>
          <FiTrash2 />
        </button>
      </div>
    )}
  </div>

</div>

<p>{p.text}</p>

{p.photo && (
<img
src={"http://localhost:3000" + p.photo}
alt=""
className="profilePostImage"
/>
)}

{p.video && (
<video controls className="profilePostImage">
<source src={p.video}/>
</video>
)}

</div>

))}

</div>

{/* EDIT POPUP */}

{editingPost && (

<div className="editPopup">

<div className="editBox">

<h3>Edit Post</h3>

<textarea
value={editText}
onChange={(e)=>setEditText(e.target.value)}
/>

<div className="editActions">

<button onClick={saveEdit}>
Save
</button>

<button onClick={()=>setEditingPost(null)}>
Cancel
</button>

</div>

</div>

</div>

)}

</div>

</div>

)

}

export default Profile;