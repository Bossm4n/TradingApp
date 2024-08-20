import { useNavigate } from "react-router-dom";
import User from "../../interfaces/User";
import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
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

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    fetch(
      `http://localhost:8080/api/user/email-and-password?email=${email}&password=${password}`
    )
      .then((response) => {
        if (response.status == 500) {
          console.log("invalid user or email");
          return null;
        } else if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((user: User) => {
        if (!user) {
          return;
        }
        sessionStorage.setItem("active", JSON.stringify(true));
        sessionStorage.setItem("user", JSON.stringify(user));

        navigate("/trading");
      })
      .catch((error) => console.log("Error while fetching data: " + error));
  };
  return (
    <>
      <Navbar />
      <div>
        <p>Email</p>
        <input type="text" value={email} onChange={handleEmailChange}></input>
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default Login;
