import React, { Component } from "react";
import Link from "./components/Link";

export class GetLinks extends Component {
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
      return <div style={eventHolder}>Please Wait...</div>;
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
      "https://raw.githubusercontent.com/HarryWickham/GoodrickeLinks/master/src/LinkData.json?token=AMJCEBF25VQ5VKWUYVITZXTBQLXHK"
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

export default GetLinks;
