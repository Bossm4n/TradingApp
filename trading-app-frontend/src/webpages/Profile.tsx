import React, { useEffect } from "react";
import ErrorPage from "../components/ErrorPage";
import Navbar from "../components/Navbar";
import { redirect, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const loggedIn = JSON.parse(sessionStorage.getItem("active") || "false");

  useEffect(() => {
    if (!loggedIn) {
      // Redirect to "/invalid-page" if the user is not logged in
      navigate("/invalid-page");
    }
  }, [loggedIn, navigate]);

  // Return null or a loading spinner while checking authentication
  if (!loggedIn) {
    return null; // or return a loading spinner
  }

  return (
    <div>
      <Navbar />
      Profile
    </div>
  );
};

export default Profile;
