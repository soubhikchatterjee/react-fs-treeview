import React from "react";
import "./App.css";
import Tree from "./components/Tree/index";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Tree
          styles={{ width: "300px", fontSize: "0.9em" }}
          basePath="/home/soubhik/Documents/EV Syncer Test Data/Sync Dummy Data/NestedSETS"
          disableContextMenu={false}
        />
      </div>
    );
  }
}

export default App;
