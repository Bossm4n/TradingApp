// Login.tsx
import { useNavigate } from "react-router-dom";
import User from "../interfaces/User";
import Navbar from "../components/Navbar";
import React, { useEffect, useRef, useState } from "react";
import ComparePasswords from "../components/ComparePasswords";
import "../css_files/login.css"; // Importing the CSS file

const Login = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const references = [passwordRef, emailRef];

  const navigate = useNavigate();
  const loggedIn = JSON.parse(sessionStorage.getItem("active") || "false");

  useEffect(() => {
    if (loggedIn) {
      navigate("/invalid-page");
    }
  }, [loggedIn, navigate]);

  if (loggedIn) {
    return null;
  }

  const handleSubmit = () => {
    for (const ref of references) {
      if (ref.current?.value == undefined || ref.current?.value === "") {
        console.log("A field was left empty!");
        return;
      }
    }
    const email = emailRef.current!.value;
    const inputtedPassword = passwordRef.current!.value;

    fetch(`${process.env.REACT_APP_API_URL}api/user/${email}`)
      .then((response) => {
        console.log(response)
        if (response.status == 500) {
          console.log("invalid email");
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

        ComparePasswords(inputtedPassword, user.hashedPassword)
          .then((match) => {
            console.log(inputtedPassword, user.hashedPassword)
            if (match) {
              sessionStorage.setItem("active", JSON.stringify(true));
              sessionStorage.setItem("user", JSON.stringify(user));

              navigate("/");
            }
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => console.log("Error while fetching data: " + error));
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <div className="login-field">
          <label htmlFor="email" className="field-label">Email</label>
          <input type="text" id="email" ref={emailRef} className="login-input" />
        </div>
        <div className="login-field">
          <label htmlFor="password" className="field-label">Password</label>
          <input type="password" id="password" ref={passwordRef} className="login-input" />
        </div>
        <button onClick={handleSubmit} className="login-button">Submit</button>
      </div>
    </>
  );
};

export default Login;
