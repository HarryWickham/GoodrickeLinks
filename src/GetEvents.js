import React, { Component } from "react";
import Event from "./components/Event";
import Carousel from "react-material-ui-carousel";

export class GetEvents extends Component {
  async componentDidMount() {
    try {
      const data = await loadData();
      this.setState({ data });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.state != null) {
      if (this.state.data.total > 0) {
        return linkCards(this.state.data);
      } else {
        return (
          <div style={eventHolder}>
            Sorry there are no events within the next 7 days
          </div>
        );
      }
    } else {
      return <div style={eventHolder}>Please Wait...</div>;
    }
  }
}

function linkCards(data) {
  //https://github.com/Learus/react-material-ui-carousel
  return (
    <Carousel autoPlay={false} animation="slide">
      {data.events.map((element) => {
        return <Event eventData={element} key={element.title} />;
      })}
    </Carousel>
  );
}

function dateToday() {
  const now = new Date();
  return (
    now.getFullYear() - 1 + "-" + (now.getMonth() + 1) + "-" + now.getDate()
  );
}

async function loadData() {
  try {
    const result = await fetch(
      "https://www.goodricke.co.uk/wp-json/tribe/events/v1/events/?page=1&per_page=5&start_date=" +
        dateToday()
    );
    const data = await result.json();
    return data;
  } catch (e) {
    console.warn(e);
  }
  throw new Error();
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
  marginTop: "8px",
  padding: "8px",
  background: "white",
  color: "black",
  textAlign: "center",
};

export default GetEvents;
