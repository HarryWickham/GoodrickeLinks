import React from "react";
import Link from "./components/Link";

import Async from "react-async";

function GetLinks() {
  return (
    <Async promiseFn={loadLinks}>
      {({ data, err, isLoading }) => {
        if (isLoading) return <div style={eventHolder}>Please Wait...</div>;
        if (err)
          return (
            <div style={eventHolder}>Something went wrong: {err.message}</div>
          );

        if (data) return linkCards(data);
      }}
    </Async>
  );
}

function linkCards(data) {
  return (
    <>
      {data.map((element) => {
        return (
          <Link
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

export default GetLinks;
