import React from "react";
import Link from "./components/Link";

function GetLinks() {
  return (
    <div>
      <Link
        Linktext="Lots and lots of text that wouldnt really ever be there"
        Link=""
        ImageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F437969157326254081%2FKHXl64x5.png&f=1&nofb=1"
        alt=""
      />
      <Link
        Linktext="a little bit of text"
        Link=""
        ImageURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F437969157326254081%2FKHXl64x5.png&f=1&nofb=1"
        alt=""
      />
    </div>
  );
}

export default GetLinks;
