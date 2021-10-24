import React, { useState, useLayoutEffect } from "react";

function Event(eventData) {
  const [width, height] = useWindowSize();
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
          src={eventData.eventData.events[0].image.url}
          height="auto"
          width="190xp"
          style={{ margin: "8px" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            maxHeight: "200px",
          }}
        >
          <div style={{ fontSize: 20 }}>
            {decodeHTMLEntities(eventData.eventData.events[0].title)}
          </div>
          <div style={{ fontSize: 15 }}>
            {decodeHTMLEntities(eventData.eventData.events[0].description)}
          </div>
        </div>
      </div>
    </div>
  );
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

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const eventHolder = {
  display: "flex",
  flexShrink: 1,
  flexDirection: "row",
  height: "200px",
  width: "90%",
  maxWidth: "800px",
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
