import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {

    try{

      const res = await axios.post("http://localhost:3000/login",{
        email,
        password
      });

      localStorage.setItem("user", JSON.stringify(res.data.user || res.data));

      navigate("/home");

    }catch(err){

      alert("Login failed");

    }

  };

  return(

    <div className="loginPage">

      {/* LEFT SIDE */}
      <div className="loginLeft">

        <div className="logo">
          ConnectSphere
        </div>

        <h1 className="welcomeText">
          Welcome Back to the ConnectSphere
        </h1>

        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
          alt="network"
          className="loginImage"
        />

      </div>


      {/* RIGHT SIDE */}
      <div className="loginRight">

        <div className="loginCard">

          <label>Email or Username</label>

          <input
            placeholder="Email or Username"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <p className="forgot">
            Forgot Password?
          </p>

          <button
            className="loginBtn"
            onClick={login}
          >
            Log In
          </button>

          <p className="signupText">
            Don't have an account?
            <span onClick={()=>navigate("/register")}>
              Sign Up
            </span>
          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;