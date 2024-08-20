import { Sign } from "crypto";
import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import User from "../../interfaces/User";
import { error } from "console";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const loggedIn = JSON.parse(sessionStorage.getItem("active") || "false");

  useEffect(() => {
    if (loggedIn) {
      // Redirect to "/invalid-page" if the user is not logged in
      navigate("/invalid-page");
    }
  }, [loggedIn, navigate]);

  // Return null or a loading spinner while checking authentication
  if (loggedIn) {
    return null; // or return a loading spinner
  }

  const handleEmail = (e: any) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {};

  return (
    <>
      <Navbar />
      <div>
        <p>Email</p>
        <input type="text" onChange={handleEmail} value={email}></input>
        <p>Password</p>
        <input
          type="password"
          onChange={handlePassword}
          value={password}
        ></input>
        <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
          Sign up
        </button>
      </div>
    </>
  );
};

export default Signup;
