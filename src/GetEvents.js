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
      return linkCards(this.state.data);
    } else {
      return <div>Please Wait</div>;
    }
  }
}

function linkCards(data) {
  //https://github.com/Learus/react-material-ui-carousel
  return (
    <Carousel autoPlay={false}>
      {data.events.map((element) => {
        return <Event eventData={element} />;
      })}
    </Carousel>
  );
}

function dateToday() {
  const now = new Date();
  return now.getFullYear() - 1 + "-" + now.getMonth() + "-" + now.getDate();
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

export default GetEvents;
