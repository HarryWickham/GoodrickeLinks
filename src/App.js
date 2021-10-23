import React from "react";
import Link from "./components/Link";

function App() {
  return (
    <div style={holder}>
      <Link
        Linktext="Lots and lots of text that wouldnt really ever be there"
        Link=""
        ImageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F437969157326254081%2FKHXl64x5.png&f=1&nofb=1"
      />
      <Link
        Linktext="a little bit of text"
        Link=""
        ImageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F437969157326254081%2FKHXl64x5.png&f=1&nofb=1"
      />
    </div>
  );
}

const holder = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100vw",
  height: "100vh",
};

const text = {
  color: "#1f6f2e",
  fontSize: "60px",
};

export default App;
