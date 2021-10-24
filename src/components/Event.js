import React from "react";

function Event(eventData) {
  if (eventData.eventData.id != null) {
    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={eventHolder}>
          <img
            src={eventData.eventData.image.url}
            height="auto"
            width="250xp"
            style={{ paddingBlock: "4px" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxHeight: "200px",
              margin: "8px",
            }}
          >
            <div style={{ fontSize: 20 }}>
              {decodeHTMLEntities(eventData.eventData.title)}
            </div>
            <div
              style={{ fontSize: 15, maxHeight: "74px", lineHeight: "18px" }}
            >
              {decodeHTMLEntities(eventData.eventData.description)}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={eventHolder}>
          <h2 style={{ textAlign: "center" }}>
            Sadly there are no events within the next 7 days
          </h2>
        </div>
      </div>
    );
  }
}

var element = document.createElement("div");

function decodeHTMLEntities(str) {
  if (str && typeof str === "string") {
    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
    element.innerHTML = str;
    str = element.textContent;
    element.textContent = "";
  }

  return str;
}

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
  margin: "8px",
  background: "white",
  color: "black",
};

export default Event;
