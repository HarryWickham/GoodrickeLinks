import React from "react";

function Event(eventData) {
  if (eventData.eventData.id != null) {
    var GMHref =
      "https://www.google.com/maps/place/" + eventData.eventData.venue.zip;
    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <a style={eventHolder} href={eventData.eventData.url}>
          <img
            alt=""
            src={
              eventData.eventData.image.url != null
                ? eventData.eventData.image.url
                : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F437969157326254081%2FKHXl64x5.png&f=1&nofb=1"
            }
            height="250px"
            width="auto"
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
            <div style={{ fontSize: 20, textAlign: "center" }}>
              {decodeHTMLEntities(eventData.eventData.title)}
            </div>
            <div
              style={{
                fontSize: 17,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {dateInfo(eventData.eventData)}
            </div>
            <div
              style={{
                fontSize: 17,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {eventData.eventData.venue.venue}&nbsp;&nbsp;
              <a href={GMHref}>{eventData.eventData.venue.zip}</a>
            </div>
            <div
              style={{
                fontSize: 17,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <a href={eventData.eventData.website}>
                {eventData.eventData.website}
              </a>
            </div>
            <br></br>
            <div
              style={{
                fontSize: 17,
                fontWeight: "bold",
                textAlign: "center",
                color: "#1f6f2e",
              }}
            >
              Click here to find out more...
            </div>
          </div>
        </a>
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

function dateInfo(eD) {
  var now = new Date();
  console.log(nowFormat(now, 0));
  console.log(nowFormat(now, 1));
  console.log(dateFormat(eD.utc_start_date_details));
  if (eD.all_day) {
    if (nowFormat(now, 0) === dateFormat(eD.utc_start_date_details)) {
      return "Today";
    } else if (nowFormat(now, 1) === dateFormat(eD.utc_start_date_details)) {
      return "Tomorrow ";
    } else {
      return (
        eD.start_date_details.day +
        "/" +
        eD.start_date_details.month +
        "/" +
        eD.start_date_details.day
      );
    }
  }
  if (nowFormat(now, 0) === dateFormat(eD.utc_start_date_details)) {
    return (
      "Today " +
      eD.start_date_details.hour +
      ":" +
      eD.start_date_details.minutes +
      " - " +
      eD.end_date_details.hour +
      ":" +
      eD.end_date_details.minutes
    );
  } else if (nowFormat(now, 1) === dateFormat(eD.utc_start_date_details)) {
    return (
      "Tomorrow " +
      eD.start_date_details.hour +
      ":" +
      eD.start_date_details.minutes +
      " - " +
      eD.end_date_details.hour +
      ":" +
      eD.end_date_details.minutes
    );
  } else if (
    dateFormat(eD.utc_start_date_details) ===
    dateFormat(eD.utc_end_date_details)
  ) {
    return (
      eD.start_date_details.day +
      "/" +
      eD.start_date_details.month +
      "/" +
      eD.start_date_details.day +
      " " +
      eD.start_date_details.hour +
      ":" +
      eD.start_date_details.minutes +
      " - " +
      eD.end_date_details.hour +
      ":" +
      eD.end_date_details.minutes
    );
  } else {
    return (
      eD.start_date_details.day +
      "/" +
      eD.start_date_details.month +
      "/" +
      eD.start_date_details.day +
      " " +
      eD.start_date_details.hour +
      ":" +
      eD.start_date_details.minutes +
      " - " +
      eD.end_date_details.day +
      "/" +
      eD.end_date_details.month +
      "/" +
      eD.end_date_details.day +
      " " +
      eD.end_date_details.hour +
      ":" +
      eD.end_date_details.minutes
    );
  }
}

function nowFormat(now, offset) {
  if (offset === 1) {
    now = new Date(now.getTime() + 1000 * 60 * 60 * 24);
  }
  return (
    now.getUTCFullYear() +
    "-" +
    (now.getUTCMonth() + 1) +
    "-" +
    now.getUTCDate()
  );
}

function dateFormat(date) {
  return date.year + "-" + date.month + "-" + date.day;
}

const eventHolder = {
  display: "flex",
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
