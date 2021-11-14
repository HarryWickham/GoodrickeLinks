import React, { useState } from "react";
import AdminLink from "../components/AdminLink";
import { MdAdd, MdArrowBack } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import Async from "react-async";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";
const FormData = require("form-data");

function Admin() {
  const [state, setstate] = useState(0);
  const [linksState, setlinksState] = useState(0);
  const [linkTextState, setLinkTextState] = useState();
  const [linkURLState, setLinkURLState] = useState();
  const [imageURLState, setImageURLState] = useState();
  const [imageAltState, setImageAltState] = useState();
  return (
    <div>
      <IconButton href="/" style={{ padding: "4px" }}>
        <MdArrowBack size="30" />
      </IconButton>
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
              <TextField
                style={{ margin: 10 }}
                label="Link Text"
                type="text"
                id="LinkText"
                required
                variant="outlined"
                onChange={(value) => {
                  setLinkTextState(value.target.value);
                }}
              />
              <TextField
                style={{ margin: 10 }}
                label="Link URL"
                type="text"
                id="LinkURL"
                required
                variant="outlined"
                onChange={(value) => {
                  setLinkURLState(value.target.value);
                }}
              />
              <TextField
                style={{ margin: 10 }}
                label="Image URL"
                type="text"
                id="ImageURL"
                variant="outlined"
                onChange={(value) => {
                  setImageURLState(value.target.value);
                }}
              />
              <TextField
                style={{ margin: 10 }}
                label="Image Alt Text"
                type="text"
                id="ImageAlt"
                variant="outlined"
                onChange={(value) => {
                  setImageAltState(value.target.value);
                }}
              />
              <AdminLink
                Linktext={linkTextState}
                Link={linkURLState}
                ImageURL={
                  imageURLState != null
                    ? imageURLState
                    : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F437969157326254081%2FKHXl64x5.png&f=1&nofb=1"
                }
                alt={imageAltState}
                newLink="true"
              />
              <label>&nbsp;</label>
              <Button variant="outlined" type="submit">
                Add Link
              </Button>
            </form>
            {state == 1 ? (
              <></>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "500px",
                    width: "95%",
                  }}
                >
                  <p style={{ color: "red" }}>Authentication Falied</p>
                </div>
              </>
            )}
          </div>
        )}
        <TextField
          type="text"
          id="password"
          variant="outlined"
          label="Password"
          required
          style={{ margin: 10 }}
        />
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
          setImageAltState();
          setImageURLState();
          setLinkURLState();
          setLinkTextState();
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
