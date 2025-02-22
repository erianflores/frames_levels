import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <svg
        className="wave-svg"
        viewBox="0 5 1000 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#03dac6"
          d="M0,160 C180,260 360,60 540,160 C720,260 900,60 1080,160 C1260,260 1440,60 1440,160 L1440,320 L0,320 Z"
        />
      </svg>
      <div className="footer-content">
        <p>© 2025 Frames & Levels. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
