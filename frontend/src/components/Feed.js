import React from "react";
import PostCard from "./PostCard";
import "./Feed.css";

function Feed({posts,refresh,user}){

  return(

    <div style={{flex:1,padding:"20px"}}>

      {posts.map((p)=>(

        <PostCard
          key={p._id}
          post={p}
          refresh={refresh}
          user={user}
        />

      ))}

    </div>

  );

}

export default Feed;