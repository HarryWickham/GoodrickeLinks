import React from "react";
import Event from "./components/Event";
import Carousel from "react-material-ui-carousel";
import Async from "react-async";

function GetEvents() {
  return (
    <Async promiseFn={loadEvents}>
      {({ data, err, isLoading }) => {
        if (isLoading) {
          return <div style={eventHolder}>Please Wait...</div>;
        }
        if (err) {
          return (
            <div style={eventHolder}>Something went wrong: {err.message}</div>
          );
        }
        if (data) {
          if (data.total > 0) {
            return eventCards(data);
          } else {
            return (
              <div style={eventHolder}>
                Sorry there are no CSA events within the next 7 days
              </div>
            );
          }
        }
      }}
    </Async>
  );
}

function eventCards(data) {
  //https://github.com/Learus/react-material-ui-carousel
  return (
    <Carousel autoPlay={false} animation="slide" style={{ width: "100%" }}>
      {data.events.map((element) => {
        return <Event eventData={element} key={element.title} />;
      })}
    </Carousel>
  );
}

function dateToday() {
  const now = new Date();
  return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
}

const loadEvents = () =>
  fetch(
    "https://www.goodricke.co.uk/wp-json/tribe/events/v1/events/?page=1&per_page=5&start_date=" +
      dateToday()
  )
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

export default GetEvents;
