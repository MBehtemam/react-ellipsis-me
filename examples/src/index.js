import React from "react";
import ReactDOM from "react-dom";
import ReactEllipsisMe from "../../src";

const App = () => (
  <ReactEllipsisMe
    text="HOOOOLO HOpe"
    len="5"
    ellipsis="-->"
    ellipsisClass="elip"
    ellipsisStyle={{ color: "red" }}
  />
);

ReactDOM.render(<App />, document.getElementById("root"));
