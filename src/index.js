import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Tree from "./lib";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Tree
          styles={{ width: "300px", fontSize: "0.9em" }}
          basePath=""
          disableContextMenu={false}
          onItemSelected={() => {}}
        />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
