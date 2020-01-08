import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Tree from "./lib";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Tree
          className={this.props.className || ""}
          basePath={this.props.basePath || "/"}
          disableContextMenu={this.props.disableContextMenu || false}
          onItemSelected={this.props.onItemSelected || null}
        />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
