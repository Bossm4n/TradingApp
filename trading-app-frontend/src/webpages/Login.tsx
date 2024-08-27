import { useNavigate } from "react-router-dom";
import User from "../interfaces/User";
import Navbar from "../components/Navbar";
import React, { useEffect, useRef, useState } from "react";
import HashingFunction from "../components/HashingFunction";
import ComparePasswords from "../components/ComparePasswords";

const Login = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const references = [passwordRef, emailRef];

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

  const handleSubmit = () => {
    for (const ref of references) {
      if (ref.current?.value == undefined || ref.current?.value === "") {
        console.log("A field was left empty!");
        return;
      }
    }
    const email = emailRef.current!.value;
    const inputtedPassword = passwordRef.current!.value;

    fetch(`http://localhost:8080/api/user/${email}`)
      .then((response) => {
        if (response.status == 500) {
          console.log("invalid email");
          return null;
        } else if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((user: User) => {
        console.log(user)
        if (!user) {
          return;
        }

        ComparePasswords(inputtedPassword, user.hashedPassword)
          .then((match) => {
            if (match) {
              sessionStorage.setItem("active", JSON.stringify(true));
              sessionStorage.setItem("user", JSON.stringify(user));

              navigate("/trading");
            }
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => console.log("Error while fetching data: " + error));
  };
  return (
    <>
      <Navbar />
      <div>
        <p>Email</p>
        <input type="text" ref={emailRef}></input>
        <p>Password</p>
        <input type="password" ref={passwordRef}></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default Login;
