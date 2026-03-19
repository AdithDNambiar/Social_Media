import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { FiHome, FiBell, FiMessageCircle, FiUser, FiBookmark, FiSend } from "react-icons/fi";

function Sidebar(){

  const navigate = useNavigate();
  const location = useLocation();

  const unreadMessages = Number(localStorage.getItem("unreadMessages")) || 0;
  const unreadNotifications = Number(localStorage.getItem("unreadNotifications")) || 0;

  const isActive = (path) => location.pathname === path;

  return(

    <div className="sidebar">

  <img src="/CSlogo.png" alt="logo" className="sidebarLogo"/>

  <p 
    className={isActive("/home") ? "active menuItem" : "menuItem"}
    onClick={()=>navigate("/home")}
  >
    <FiHome size={26}/>
    <span></span>
  </p>

  <p 
    className={isActive("/notifications") ? "active menuItem" : "menuItem"}
    onClick={()=>navigate("/notifications")}
  >
    <FiBell size={26}/>
    <span></span>
  </p>

  <p 
    className={isActive("/messages") ? "active menuItem" : "menuItem"}
    onClick={()=>navigate("/messages")}
  >
    <FiSend size={26}/>
    <span></span>
  </p>

  <p 
    className={isActive("/profile") ? "active menuItem" : "menuItem"}
    onClick={()=>navigate("/profile")}
  >
    <FiUser size={26}/>
    <span></span>
  </p>

  <p 
    className={isActive("/saved") ? "active menuItem" : "menuItem"}
    onClick={()=>navigate("/saved")}
  >
    <FiBookmark />
    <span></span>
  </p>

  <button
    className="createPostBtn"
    onClick={() => navigate("/create")}
  >
    +
  </button>

</div>

  );

}

export default Sidebar;