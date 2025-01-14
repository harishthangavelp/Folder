import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "./Home.css";  // Ensure the CSS file is imported

function Home() {
  return (
    <>
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to File & Folder Explorer</h1>
        <p className="home-description">
          This is your personal space to create, manage, and organize your files and folders with ease. 
          Use the simple and intuitive interface to perform various operations on your file system.
        </p>
        <div className="home-actions">
          <Link to="/files">
            <button className="action-btn">Go to File Explorer</button>
          </Link>
          <Link to="/folders">
            <button className="action-btn">Go to Folder Explorer</button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
