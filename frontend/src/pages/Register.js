import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register(){

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [username,setUsername] = useState("");

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const [bio,setBio] = useState("");

  const navigate = useNavigate();

  const register = async () => {

    if(password !== confirmPassword){
      alert("Passwords do not match");
      return;
    }

    try{

      await axios.post("http://localhost:3000/register",{
        name:firstName + " " + lastName,
        email,
        password
      });

      alert("Account created");

      navigate("/");

    }catch(err){

      alert("Error creating account");

    }

  };

  return(

    <div className="registerPage">

      {/* LEFT SIDE */}

      <div className="registerLeft">

        <div className="logo">
          ConnectSphere
        </div>

        <h1 className="welcomeText">
          Welcome to ConnectSphere!
        </h1>

        <img
        src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
        alt="network"
        className="registerImage"
        />

      </div>


      {/* RIGHT SIDE */}

      <div className="registerRight">

        <div className="registerForm">

          {/* STEP 1 */}

          <h3>Step 1: Your Info</h3>

          <div className="row">

            <input
            placeholder="First Name"
            onChange={(e)=>setFirstName(e.target.value)}
            />

            <input
            placeholder="Last Name"
            onChange={(e)=>setLastName(e.target.value)}
            />

            <input
            placeholder="Username"
            onChange={(e)=>setUsername(e.target.value)}
            />

          </div>


          {/* STEP 2 */}

          <h3>Step 2: Security</h3>

          <div className="row">

            <input
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            />

            <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e)=>setConfirmPassword(e.target.value)}
            />

          </div>


          {/* STEP 3 */}

          <h3>Step 3: Profile</h3>

          <div className="row">

            <input type="file"/>

            <textarea
            placeholder="Short Bio (optional)"
            onChange={(e)=>setBio(e.target.value)}
            />

          </div>

          <input
          className="interestInput"
          placeholder="Interests (Tech, Art, Design...)"
          />

          <div className="buttonRow">

            <button
            className="createBtn"
            onClick={register}
            >
              Create My Account
            </button>

           

          </div>

          <p className="loginLink">
            Already have an account?
            <span onClick={()=>navigate("/")}>
              Log In
            </span>
          </p>

        </div>

      </div>

    </div>

  );

}

export default Register;