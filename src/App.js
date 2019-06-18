import React from "react";
import "./App.css";
import "./ContextMenu.css";
import "./ModalBox.css";
import Tree from "./components/Tree";

function App() {
  return (
    <div className="App">
      <Tree basePath="/home/soubhik/Documents/EV Syncer Test Data/Sync Dummy Data/NestedSETS" />
    </div>
  );
}

export default App;
