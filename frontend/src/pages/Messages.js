import React,{useEffect,useState} from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./Messages.css";
import {io} from "socket.io-client";

// 🔥 CREATE SOCKET (OUTSIDE FUNCTION)
const socket = io("http://localhost:3000");

function Messages(){

const user = JSON.parse(localStorage.getItem("user"));

const [users,setUsers] = useState([]);
const [selected,setSelected] = useState(null);
const [messages,setMessages] = useState([]);
const [text,setText] = useState("");
const [activeUser,setActiveUser]=useState(null);

// 🔥 UNREAD USERS
const [unreadUsers,setUnreadUsers] = useState(
  JSON.parse(localStorage.getItem("unreadUsers")) || []
);


// LOAD USERS
const loadUsers = async () => {

  const res = await axios.get("http://localhost:3000/users");

  const filtered = res.data.filter(u => String(u._id) !== String(user._id));

  setUsers(filtered);

};


// LOAD CHAT
const loadChat = async(userObj)=>{

  setSelected(userObj._id);
  setActiveUser(userObj);

  const res = await axios.get(`http://localhost:3000/messages/${user._id}/${userObj._id}`);
  setMessages(res.data);

  // 🔥 REMOVE FROM UNREAD
  let updated = unreadUsers.filter(id => String(id) !== String(userObj._id));

  setUnreadUsers(updated);
  localStorage.setItem("unreadUsers", JSON.stringify(updated));
  localStorage.setItem("unreadMessages", updated.length);

};


// SEND MESSAGE
const send = async()=>{

  if(text.trim()==="") return;

  const newMsg = {
    sender: user._id,
    receiver: selected,
    text: text,
    createdAt: new Date()
  };

  // 🔥 INSTANT UI UPDATE (IMPORTANT)
  setMessages(prev => [...prev, newMsg]);

  // SAVE TO DB
  await axios.post("http://localhost:3000/messages/send",{
    sender:user._id,
    receiver:selected,
    text:text
  });

  // SOCKET SEND
  socket.emit("sendMessage", newMsg);

  setText("");
};


// 🔥 INITIAL LOAD
useEffect(()=>{
  loadUsers();

  // JOIN SOCKET
  socket.emit("join", user._id);

  // CLEAR SIDEBAR DOT
  localStorage.setItem("unreadMessages",0);

},[]);


// 🔥 RECEIVE REALTIME MESSAGE
useEffect(()=>{

  socket.off("receiveMessage"); // 🔥 IMPORTANT (clears old listeners)

  socket.on("receiveMessage", (data)=>{

    if(String(data.sender) === String(selected)){
      setMessages(prev => [...prev, data]);
    }
    else{
      let updated = JSON.parse(localStorage.getItem("unreadUsers")) || [];

      if(!updated.includes(data.sender)){
        updated.push(data.sender);
      }

      setUnreadUsers(updated);
      localStorage.setItem("unreadUsers", JSON.stringify(updated));
      localStorage.setItem("unreadMessages", updated.length);
    }

  });

},[selected]);



return(

<div className="messagesLayout">

<Sidebar/>

<div className="messagesContainer">


{/* USERS LIST */}

<div className="chatUsers">

<h3>Messages</h3>

{users.map(u=>(

<div
key={u._id}
className={`chatUser ${activeUser?._id === u._id ? "active" : ""}`}
onClick={()=>loadChat(u)}
>

<img
src={u.profilePic || "https://i.imgur.com/HeIi0wU.png"}
alt=""
/>

<span>{u.name}</span>

{/* 🔵 USER DOT */}
{unreadUsers.includes(u._id) && (
  <span className="userMsgDot"></span>
)}

</div>

))}

</div>



{/* CHAT WINDOW */}

<div className="chatWindow">

{selected ? (

<>

{/* 🔥 HEADER */}
<div className="chatHeader">
  <img   
    src={activeUser?.profilePic || "https://i.imgur.com/HeIi0wU.png"}   
    alt=""
  />
  <span>{activeUser?.name}</span>
</div>


<div className="chatMessages">

{messages.map((m,i)=>(

<div
key={i}
className={String(m.sender) === String(user._id) ? "myMsg" : "theirMsg"}
>

{m.text}

</div>

))}

</div>


<div className="chatInput">

<input
value={text}
onChange={(e)=>setText(e.target.value)}
placeholder="Type message..."
/>

<button onClick={send}>Send</button>

</div>

</>

):(  

<div className="noChat">
Select a chat to start messaging
</div>

)}

</div>


</div>

</div>

);

}

export default Messages;