import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import HashingFunction from "../components/HashingFunction";
import User from "../interfaces/User";
import "../css_files/signup.css"; // Importing the CSS file

const Signup = () => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    DOB: "",
    hashedPassword: "",
    balance: 50000,
  });
  const [date, setDate] = useState<string>("");
  const [hashedPassword, setHashedPassword] = useState<string>("");

  const navigate = useNavigate();
  const loggedIn = JSON.parse(sessionStorage.getItem("active") || "false");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (loggedIn) {
      navigate("/invalid-page");
    }
  }, [loggedIn, navigate]);

  if (loggedIn) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    // Check for empty fields
    if ([firstNameRef, lastNameRef, emailRef, dobRef, passwordRef].some(ref => ref.current?.value === "")) {
      console.log("A field was left empty!");
      return;
    }
  
    try {
      // Hash the password
      const hashedPasswordFromPromise = await HashingFunction(passwordRef.current!.value);
      if (hashedPasswordFromPromise === "") {
        console.log("Error in hashing Function");
        return;
      }
  
      const newUser: User = {
        firstName: firstNameRef.current!.value,
        lastName: lastNameRef.current!.value,
        email: emailRef.current!.value,
        DOB: date,
        hashedPassword: hashedPasswordFromPromise,
        balance: 50000
      };
  
      // Submit the user data
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/user/signup`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const contentType = response.headers.get("Content-Type");
  
  
      const responseJSON = await response.json();
  
      if (response.status === 500) {
        console.log(responseJSON)
        console.log("Internal Server Error");
        return;
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      console.log(responseJSON);
  
      // Update session storage and navigate
      newUser.userID = responseJSON.userID;
      sessionStorage.setItem("active", JSON.stringify(true));
      sessionStorage.setItem("user", JSON.stringify(newUser));
      navigate("/");
  
    } catch (err) {
      console.log("Error while posting user data: " + err);
    }
  };
  

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-field">
          <label className="field-label" htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" ref={firstNameRef} className="form-input" />
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" ref={lastNameRef} className="form-input" />
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} className="form-input" />
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="dob">Date Of Birth</label>
          <input type="date" id="dob" ref={dobRef} className="form-input" onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} className="form-input" />
        </div>

        <button type="submit" className="signup-button">Sign up</button>
      </form>
    </>
  );
};

export default Signup;
