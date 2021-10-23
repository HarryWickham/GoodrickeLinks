import React, { useState, useEffect } from "react";
import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";

function Socials() {
  const [FBhover, setFBHover] = useState();
  const [Thover, setTHover] = useState();
  const [Ihover, setIHover] = useState();

  useEffect(() => {
    if (FBhover) {
      document.getElementById("FaFacebookF").style.color = "#1f6f2e";
    } else {
      document.getElementById("FaFacebookF").style.color = "black";
    }
    if (Thover) {
      document.getElementById("FaTwitter").style.color = "#1f6f2e";
    } else {
      document.getElementById("FaTwitter").style.color = "black";
    }
    if (Ihover) {
      document.getElementById("FaInstagram").style.color = "#1f6f2e";
    } else {
      document.getElementById("FaInstagram").style.color = "black";
    }
  });

  return (
    <div style={holder}>
      <a
        href="https://www.facebook.com/GoodrickeCollege/"
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setFBHover(true)}
        onMouseLeave={() => setFBHover(false)}
      >
        <FaFacebookF style={icon} id="FaFacebookF" />
      </a>
      <a
        href="https://www.instagram.com/goodrickecollege/"
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setIHover(true)}
        onMouseLeave={() => setIHover(false)}
      >
        <FaInstagram style={icon} id="FaInstagram" />
      </a>
      <a
        href="https://twitter.com/goodrickeyork"
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setTHover(true)}
        onMouseLeave={() => setTHover(false)}
      >
        <FaTwitter style={icon} id="FaTwitter" />
      </a>
    </div>
  );
}

const icon = {
  margin: "8px",
  height: "32px",
  width: "auto",
};

const holder = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "center",
};

export default Socials;
