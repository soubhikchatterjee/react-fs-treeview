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
          basePath="/home/soubhik/Documents/EV Syncer Test Data/Sync Dummy Data/NestedSETS"
          disableContextMenu={false}
          onItemSelected={a => {
            console.log("onItemSelected", a);
          }}
        />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
