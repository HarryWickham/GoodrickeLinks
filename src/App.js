import React from "react";

import Socials from "./components/Socials";
import GetLinks from "./GetLinks";

function App() {
  return (
    <div style={holder}>
      <div style={center_container}>
        <div style={link_holder}>
          <GetLinks />
        </div>
        <Socials style={{ alignSelf: "end" }} />
      </div>
    </div>
  );
}

const holder = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  width: "100vw",
  height: "100vh",
};

const link_holder = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const center_container = {
  justifyContent: "space-between",
  flexGrow: 1,
  flexDirection: "column",
  display: "flex",
};

export default App;
