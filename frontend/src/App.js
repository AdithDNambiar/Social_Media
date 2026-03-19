import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Chat from "./pages/Chat";
import Notifications from "./pages/Notifications";
import CreatePost from "./pages/CreatePost";
import Saved from "./pages/Saved";

function App(){

  return(

    <Router>

      <Routes>

        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/messages" element={<Messages/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="/create" element={<CreatePost />} />
        <Route path="/saved" element={<Saved />} />

      </Routes>

    </Router>

  );

}

export default App;