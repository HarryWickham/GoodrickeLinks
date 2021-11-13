import React from "react";
import AdminLink from "../components/AdminLink";
import { MdAdd } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import Async from "react-async";

function Admin() {
  return (
    <div>
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
              <div style={eventHolder}>Something went wrong: {err.message}</div>
            );

          if (data) return linkCards(data);
        }}
      </Async>
      <div style={password}>
        <IconButton aria-label="add" size="large" onClick={() => {}}>
          <MdAdd />
        </IconButton>
        <p>Enter Password Before Editing:</p>
        <input type="text" id="password" />
      </div>
    </div>
  );
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
