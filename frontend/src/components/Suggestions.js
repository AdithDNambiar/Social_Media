import React from "react";
import "./Suggestions.css";

function Suggestions(){

  return(

    <div style={{
      width:"250px",
      padding:"20px",
      borderLeft:"1px solid #ddd",
      background:"#fff"
    }}>

      <h3>Suggested</h3>

      <div style={{marginBottom:"10px"}}>
        <p>Emma</p>
        <button>Follow</button>
      </div>

      <div style={{marginBottom:"10px"}}>
        <p>Daniel</p>
        <button>Follow</button>
      </div>

      <div style={{marginBottom:"10px"}}>
        <p>Sophia</p>
        <button>Follow</button>
      </div>

    </div>

  );

}

export default Suggestions;