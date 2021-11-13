import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

function AdminLink({ Linktext, Link, ImageURL, alt }) {
  const [state, setstate] = useState(0);
  if (state == 0) {
    return (
      <div style={wrapper}>
        <div style={row}>
          <img src={ImageURL} style={image} alt={alt} />
          <h3 style={text} id={Linktext}>
            {Linktext}
          </h3>
        </div>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => {
            deleteLink(Linktext);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  } else if (state == 1) {
    setTimeout(function () {
      setstate(3);
    }, 2000);
    return (
      <div style={wrapper}>
        <p>Link Deleted</p>
      </div>
    );
  } else if (state == 2) {
    setTimeout(function () {
      setstate(0);
    }, 2000);
    return (
      <div style={wrapper}>
        <p>Authentication Falied</p>
      </div>
    );
  } else if (state == 3) {
    return <div></div>;
  }

  function deleteLink(Linktext) {
    var password = document.getElementById("password").value;
    var credentials = btoa("USER:" + password);
    var auth = { Authorization: `Basic ${credentials}` };
    fetch(
      "https://goodricke-links-api.herokuapp.com/link/" +
        encodeURIComponent(Linktext.trim()),
      {
        method: "DELETE",
        headers: auth,
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.message);
        if (response.message == "Link deleted.") {
          setstate(1);
        } else {
          setstate(2);
        }
      });
  }
}

const wrapper = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

const row = {
  display: "flex",
  flexShrink: 1,
  flexDirection: "row",
  height: "70px",
  width: "90%",
  maxWidth: "500px",
  border: "1px",
  borderStyle: "solid",
  borderColor: "grey",
  alignItems: "center",
  textDecoration: "none",
  boxShadow: "3px 3px 2px #9E9E9E",
  borderRadius: "4px",
  margin: "8px",
  background: "white",
  color: "black",
};

const image = {
  height: "60px",
  width: "auto",
  paddingInline: "4px",
};

const text = {
  maxHeight: "70px",
  flex: 1,
  flexGrow: 1,
  fontSize: "20px",
  color: "black",
  textAlign: "center",
  paddingRight: "8px",
  overflow: "hidden",
};

export default AdminLink;
