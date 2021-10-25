import React, { Component } from "react";
import Link from "./components/Link";

export class GetLinks extends Component {
  async componentDidMount() {
    try {
      const data = await loadData();
      this.setState({ data });
      console.log(this.state.data);
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
  return (
    <>
      {data.Links.map((element) => {
        return (
          <Link
            key={element.Linktext}
            Linktext={element.Linktext}
            Link={element.Link}
            ImageURL={element.ImageURL}
            alt={element.alt}
          />
        );
      })}
    </>
  );
}

async function loadData() {
  try {
    const result = await fetch(
      "https://www.goodricke.co.uk/wp-content/uploads/LinkData.json"
    );
    const data = await result.json();
    return data;
  } catch (e) {
    console.warn(e);
  }
  throw new Error();
}

export default GetLinks;
