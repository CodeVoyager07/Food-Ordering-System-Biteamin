import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("theme--dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("theme--dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="Logo" height={70} />
      <h1 className="navbar-title">Admin Panel</h1>
      <div className="navbar-right">
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌙" : "☀"}
        </button>
        <img className="profile" src={assets.profile_icon} alt="Profile" width={35} />
      </div>
    </div>
  );
};

export default Navbar;