// Signup.tsx
import Navbar from "../components/Navbar";
import React, { useEffect, useRef, useState } from "react";
import User from "../interfaces/User";
import { useNavigate } from "react-router-dom";
import HashingFunction from "../components/HashingFunction";
import "../css_files/signup.css"; // Importing the CSS file
import { Session } from "inspector";

const Signup = () => {
  const [hashedPassword, setHashedPassword] = useState<string>("");

  const navigate = useNavigate();
  const loggedIn = JSON.parse(sessionStorage.getItem("active") || "false");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const references = [firstNameRef, lastNameRef, emailRef, dobRef, passwordRef];

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

    for (const ref of references) {
      if (ref.current?.value == undefined || ref.current?.value === "") {
        console.log("A field was left empty!");
        return;
      }
    }

    await HashingFunction(passwordRef.current!.value).then(
      (hashedPasswordFromPromise) => {
        setHashedPassword((prevState) => hashedPasswordFromPromise);
        console.log(hashedPasswordFromPromise)
        console.log(hashedPassword)
        if (hashedPasswordFromPromise == "") {
          console.log("Error in hashing Function");
          return;
        }
      }
    );

    

    const newUser: User = {
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
      email: emailRef.current!.value,
      DOB: "2003-07-09",
      hashedPassword: hashedPassword,
      balance: 50000,
    };

    fetch(`${process.env.REACT_APP_API_URL}api/user/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.json())
        if (response.status == 500) {
          console.log("Internal Server Error");
          return null;
        } else if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((signUpResponseJSON: { userId: number; message: string }) => {
        console.log(signUpResponseJSON)
        newUser.userID = signUpResponseJSON.userId;

        sessionStorage.setItem("active", JSON.stringify(true));
        sessionStorage.setItem("user", JSON.stringify(newUser));

        navigate("/");
      })
      .catch((err) => console.log("Error while posting user Data: " + err));
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-field">
          <label className="field-label" htmlFor="first-name">
            First Name
          </label>
          <input
            type="text"
            id="first-name"
            ref={firstNameRef}
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="last-name">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            ref={lastNameRef}
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="dob">
            Date Of Birth
          </label>
          <input type="date" id="dob" ref={dobRef} className="form-input" />
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            className="form-input"
          />
        </div>

        <button type="submit" className="signup-button">
          Sign up
        </button>
      </form>
    </>
  );
};

export default Signup;
