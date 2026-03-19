import React from "react";
import Sidebar from "../components/Sidebar";
import "./Chat.css";

function Chat(){

  return(

    <div style={{display:"flex"}}>

      <Sidebar/>

      <div style={{flex:1,padding:"30px"}}>

        <h2>Chat</h2>

        <div style={{
          border:"1px solid #ddd",
          height:"400px",
          padding:"10px",
          marginBottom:"10px"
        }}>

          <p><b>Emma:</b> Hi!</p>
          <p><b>You:</b> Hello</p>

        </div>

        <input
        placeholder="Type message..."
        style={{width:"70%",marginRight:"10px"}}
        />

        <button>Send</button>

      </div>

    </div>

  );

}

export default Chat;