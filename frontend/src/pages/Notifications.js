import React,{useEffect,useState} from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "./Notifications.css";
import "../Layout.css";
import { useNavigate, useLocation } from "react-router-dom";


function Notifications(){

    const navigate = useNavigate();


const user = JSON.parse(localStorage.getItem("user"));

const [notifications,setNotifications] = useState([]);

const loadNotifications = async()=>{

const res = await axios.get(
"http://localhost:3000/notifications/"+user._id
);

setNotifications(res.data);

};

useEffect(()=>{

loadNotifications();

},[]);

useEffect(()=>{
  localStorage.setItem("unreadMessages",0);
},[]);

const openPost = (postId)=>{

window.location.href="/?post="+postId;

};

return(

<div className="notificationsPage">

<Sidebar/>

<div className="notificationsMain">

<h2>Notifications</h2>

{notifications.map((n)=>{

return(

<div
key={n._id}
className="notificationCard"
onClick={()=>navigate("/home")}
>

<img
src={n.sender?.profilePic || "https://i.imgur.com/HeIi0wU.png"}
alt=""
/>

<div>

<p>

<b>{n.sender?.name}</b> {n.text}

</p>

</div>

</div>

);

})}

</div>

</div>

);

}

export default Notifications;