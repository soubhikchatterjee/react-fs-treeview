import React from "react";
// import { confirmAlert } from "react-confirm-alert"; // Import
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import path from "path";
import request from "../services/request";
import TreeNode from "./TreeNode";
import icon from "./fontawesome";
import Search from "./Search";
import RenameModal from "./Modals/rename";
import DeleteModal from "./Modals/delete";

export default class Tree extends React.Component {
  BASE_PATH =
    this.props.basePath ||
    "/home/soubhik/Documents/EV Syncer Test Data/Sync Dummy Data/NestedSETS";

  state = {
    nodes: [],
    newFileName: ""
  };

  componentDidMount() {
    const rootNode = {
      name: path.basename(this.BASE_PATH),
      path: this.BASE_PATH,
      type: "directory",
      size: 0,
      isOpen: false,
      children: []
    };

    this.setState({
      nodes: [rootNode]
    });
  }

  getChildNodes = async node => {
    if (!node.children) {
      return [];
    }
    return await request.tree(node.path);
  };

  handleClick = async (event, selectedNode) => {
    event.stopPropagation();

    // If folder is clicked and the folder is already open, we will close it
    if (selectedNode.isOpen === true) {
      this.emptyChildren(this.state.nodes, selectedNode);
      selectedNode.isOpen = false;
      return;
    }

    selectedNode.isOpen = !selectedNode.isOpen;

    // Get children of a selected node
    const newChildren = await this.getChildNodes(selectedNode);

    // Add the new children to the selected folder
    this.addToChildren(this.state.nodes, selectedNode, newChildren);
  };

  handleOnChange = event => {
    this.setState({
      newFileName: event.target.value
    });
  };

  handleOnRename = async selectedNode => {
    const response = await request.renameNode({
      oldPath: selectedNode.path,
      newFileName: this.state.newFileName
    });

    if (response.status === 200) {
      // Add the Item to state
      this.addItem(this.state.nodes, {
        ...selectedNode,
        newName: this.state.newFileName,
        newPath: response.data.newFilePath
      });
    }
  };

  handleOnDelete = async selectedNode => {
    const response = await request.deleteNode(selectedNode.path);
    if (response === 200) {
      this.removeItem(this.state.nodes, selectedNode);
    }
  };

  handleRightClick = (event, data) => {
    event.stopPropagation();
    const { action, node: selectedNode } = data;

    // Rename a node
    if (action === "rename") {
      this.setState(
        {
          newFileName: selectedNode.name
        },
        () => {
          RenameModal({
            newFileName: this.state.newFileName,
            handleOnChange: this.handleOnChange,
            handleOnRename: () => this.handleOnRename(selectedNode)
          });
        }
      );
    }

    // Delete a node
    if (action === "delete") {
      DeleteModal({
        path: selectedNode.path,
        handleOnDelete: () => this.handleOnDelete(selectedNode)
      });
    }
  };

  // Adds children to a selected folder
  addToChildren = (nodes, selectedNode, newChildren) => {
    for (const iterator of nodes) {
      if (iterator.type === "file") {
        continue;
      }

      if (selectedNode.path.includes(iterator.path)) {
        // If its exactly the same path append the new node in its children array
        if (selectedNode.path === iterator.path) {
          iterator.children.unshift(...newChildren);

          // Prepare a new version of the current state
          const newNodes = this.state.nodes;

          // Set the new state
          this.setState({
            nodes: newNodes
          });
          break;
        } else {
          // If its a partial match, then get inside its children and perform iteration until exact match is not found
          return this.addToChildren(
            iterator.children,
            selectedNode,
            newChildren
          );
        }
      }
    }
  };

  // Removes children from a selected folder
  emptyChildren = (nodes, selectedNode) => {
    for (const iterator of nodes) {
      if (iterator.type === "file") {
        continue;
      }

      if (selectedNode.path.includes(iterator.path)) {
        // If its exactly the same path append the new node in its children array
        if (selectedNode.path === iterator.path) {
          iterator.children = [];

          // Prepare a new version of the current state
          const newNodes = this.state.nodes;

          // Set the new state
          this.setState({
            nodes: newNodes
          });
          break;
        } else {
          // If its a partial match, then get inside its children and perform iteration until exact match is not found
          return this.emptyChildren(iterator.children, selectedNode);
        }
      }
    }
  };

  // Add an item (file or folder) to the nodes array
  addItem = (nodes, selectedNode) => {
    for (let [index, iterator] of nodes.entries()) {
      if (selectedNode.path.includes(iterator.path)) {
        // If its exactly the same path append the new node in its children array
        if (selectedNode.path === iterator.path) {
          // Add the element to the nodes array
          nodes[index] = {
            ...selectedNode,
            name: selectedNode.newName,
            path: selectedNode.newPath
          };

          // Prepare a new version of the current state
          const newNodes = this.state.nodes;

          // Set the new state
          this.setState({
            nodes: newNodes
          });
          break;
        } else {
          // If its a partial match, then get inside its children and perform iteration until exact match is not found
          return this.addItem(iterator.children, selectedNode);
        }
      }
    }
  };

  // Removes an item (file or folder) from the nodes array
  removeItem = (nodes, selectedNode) => {
    for (let [index, iterator] of nodes.entries()) {
      if (selectedNode.path.includes(iterator.path)) {
        // If its exactly the same path append the new node in its children array
        if (selectedNode.path === iterator.path) {
          // Remove the element from the nodes array
          nodes.splice(index, 1);

          // Prepare a new version of the current state
          const newNodes = this.state.nodes;

          // Set the new state
          this.setState({
            nodes: newNodes
          });
          break;
        } else {
          // If its a partial match, then get inside its children and perform iteration until exact match is not found
          return this.removeItem(iterator.children, selectedNode);
        }
      }
    }
  };

  render() {
    return (
      <div className="container" style={{ width: this.props.width || "250px" }}>
        <Search basePath={this.BASE_PATH} />
        <div className="indent-root">
          {this.state.nodes.map(node => (
            <div key={node.path}>
              <div
                className="item-wrapper mb"
                onClick={event => {
                  this.handleClick(event, node);
                }}
              >
                {icon.file(node)}
                {node.name}
              </div>
              <TreeNode
                node={node}
                handleClick={this.handleClick}
                handleRightClick={this.handleRightClick}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
