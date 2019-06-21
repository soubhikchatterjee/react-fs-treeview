import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Tree from "./lib";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Tree
          className=""
          basePath="/home/soubhik/Documents/EV Syncer Test Data/Sync Dummy Data/NestedSETS"
          disableContextMenu={false}
          onItemSelected={() => {}}
        />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
