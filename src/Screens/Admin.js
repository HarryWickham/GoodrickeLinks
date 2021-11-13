import React, { useState } from "react";
import AdminLink from "../components/AdminLink";
import { MdAdd } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import Async from "react-async";
const FormData = require("form-data");

function Admin() {
  const [state, setstate] = useState(0);
  const [linksState, setlinksState] = useState(0);
  return (
    <div>
      {linksState == 0 ? (
        <Async promiseFn={loadLinks}>
          {({ data, err, isLoading }) => {
            if (isLoading)
              return (
                <div style={eventHolder}>
                  <p
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      display: "flex",
                    }}
                  >
                    Please Wait...
                  </p>
                </div>
              );
            if (err)
              return (
                <div style={eventHolder}>
                  Something went wrong: {err.message}
                </div>
              );

            if (data) return linkCards(data);
          }}
        </Async>
      ) : (
        <div style={eventHolder}>
          <p
            style={{
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
            }}
          >
            Please Wait...
          </p>
        </div>
      )}
      <div style={password}>
        {state == 0 ? (
          <IconButton
            aria-label="add"
            size="large"
            onClick={() => {
              addLink();
            }}
          >
            <MdAdd />
          </IconButton>
        ) : (
          <>
            {state == 1 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "500px",
                  width: "95%",
                }}
              >
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "500px",
                    width: "100%",
                  }}
                  onSubmit={(e) => {
                    submitNewLink(e);
                  }}
                >
                  <label>Link Text</label>
                  <input type="text" id="LinkText" required />
                  <label>Link URL</label>
                  <input type="text" id="LinkURL" required />
                  <label>Image URL</label>
                  <input type="text" id="ImageURL" />
                  <label>Image Alt Text</label>
                  <input type="text" id="ImageAlt" />

                  <label>&nbsp;</label>
                  <button type="submit">Add Link</button>
                </form>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "500px",
                  width: "95%",
                }}
              >
                <p>Authentication Falied</p>
              </div>
            )}
          </>
        )}
        <p>Enter Password Before Editing:</p>
        <input type="text" id="password" />
      </div>
    </div>
  );

  function addLink() {
    setstate(1);
  }

  function submitNewLink(e) {
    var password = document.getElementById("password").value;
    var credentials = btoa("USER:" + password);
    var auth = { Authorization: `Basic ${credentials}` };
    e.preventDefault();
    const form = new FormData();
    form.append("Linktext", document.getElementById("LinkText").value);
    form.append("Link", document.getElementById("LinkURL").value);
    form.append("ImageURL", document.getElementById("ImageURL").value);
    form.append("alt", document.getElementById("ImageAlt").value);

    fetch("https://goodricke-links-api.herokuapp.com/link/", {
      method: "POST",
      body: form,
      headers: auth,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.Linktext == document.getElementById("LinkText").value) {
          console.log("Added " + response.Linktext);
          setstate(0);
          setlinksState(1);
          setlinksState(0);
        } else {
          console.log("Auth Failed " + response);
          setstate(2);
          setTimeout(function () {
            setstate(1);
          }, 2000);
        }
      });
  }
}

function linkCards(data) {
  return (
    <>
      {data.map((element) => {
        return (
          <AdminLink
            key={element.Linktext}
            Linktext={element.Linktext}
            Link={element.Link}
            ImageURL={
              element.ImageURL != ""
                ? element.ImageURL
                : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F437969157326254081%2FKHXl64x5.png&f=1&nofb=1"
            }
            alt={element.alt}
          />
        );
      })}
    </>
  );
}

const loadLinks = () =>
  fetch("https://goodricke-links-api.herokuapp.com/link")
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .then((res) => res.json());

const eventHolder = {
  display: "flex",
  flexShrink: 1,
  flexDirection: "column",
  height: "auto",
  width: "90%",
  maxWidth: "500px",
  border: "1px",
  borderStyle: "solid",
  borderColor: "grey",
  alignItems: "center",
  textDecoration: "none",
  boxShadow: "3px 3px 2px #9E9E9E",
  borderRadius: "4px",
  marginTop: "8px",
  padding: "8px",
  background: "white",
  color: "black",
  textAlign: "center",
};

const password = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export default Admin;
