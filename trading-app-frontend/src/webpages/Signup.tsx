import { Sign } from "crypto";
import Navbar from "../components/Navbar";
import React, { useEffect, useRef, useState } from "react";
import User from "../interfaces/User";
import { error } from "console";
import { useNavigate } from "react-router-dom";
import HashingFunction from "../components/HashingFunction";
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
      // Redirect to "/invalid-page" if the user is logged in
      navigate("/invalid-page");
    }
  }, [loggedIn, navigate]);

  // Return null or a loading spinner while checking authentication
  if (loggedIn) {
    return null; // or return a loading spinner
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Collect values from refs and set them in the state
    for (const ref of references) {
      if (ref.current?.value == undefined || ref.current?.value === "") {
        console.log("A field was left empty!");
        return;
      }
    }

    await HashingFunction(passwordRef.current!.value).then(
      (hashedPasswordFromPromise) =>{
        setHashedPassword(prevState => hashedPasswordFromPromise);
      }
    );

    if (hashedPassword == "") {
      console.log("Error in hashing Function");
      return;
    }

    const newUser: User = {
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
      email: emailRef.current!.value,
      DOB: "2003-07-09",
      hashedPassword: hashedPassword,
      balance: 50000,
    };

    await fetch("http://localhost:8080/api/user/signup", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 500) {
          console.log("Internal Server Error");
          return null;
        } else if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json()
      })
      .then((signUpResponseJSON:{userId:number,message:string})=>{
        newUser.userID = signUpResponseJSON.userId;
        console.log(signUpResponseJSON.message);

        sessionStorage.setItem("active",JSON.stringify(true));
        sessionStorage.setItem("user",JSON.stringify(newUser));

        navigate("/trading");
      })
      .catch((err) => console.log("Error while posting user Data: " + err));
    // You can now use `submittedData` for further processing (e.g., sending to a server)
    console.log(newUser);
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <p>First Name</p>
        <input type="text" ref={firstNameRef} />

        <p>Last Name</p>
        <input type="text" ref={lastNameRef} />

        <p>Email</p>
        <input type="email" ref={emailRef} />

        <p>Date Of Birth</p>
        <input type="date" ref={dobRef} />

        <p>Password</p>
        <input type="password" ref={passwordRef} />

        <button type="submit" style={{ marginTop: "10px" }}>
          Sign up
        </button>
      </form>
    </>
  );
};

export default Signup;
