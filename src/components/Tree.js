import React from "react";
import path from "path";
import PropTypes from "prop-types";
import request from "../services/request";
import TreeNode from "./TreeNode";
import icon from "./fontawesome";
import Search from "./Search";
import RenameModal from "./Modals/rename";
import DeleteModal from "./Modals/delete";
import MoveModal from "./Modals/move";

export default class Tree extends React.Component {
  BASE_PATH = this.props.basePath;

  state = {
    nodes: [],
    newFileName: "",
    overwrite: false,
    dragdrop: {
      sourceNode: {},
      destinationNode: {}
    }
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

  handleOnMove = async () => {
    const response = await request.dragDrop({
      source: this.state.dragdrop.sourceNode.path,
      destination: this.state.dragdrop.destinationNode.path,
      overwrite: this.state.overwrite
    });

    this.setState({
      overwrite: false
    });

    if (response.status === 201) {
      this.removeItem(this.state.nodes, this.state.dragdrop.sourceNode);
      this.emptyChildren(this.state.nodes, this.state.dragdrop.destinationNode);
    }
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
            selectedNode,
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
          iterator.isOpen = false;

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

  // Toggles the overwrite checkbox
  toggleOverwrite = () => {
    this.setState({
      overwrite: !this.state.overwrite
    });
  };

  // Drag & Drop handlers
  onDrop = (event, selectedNode) => {
    event.preventDefault();
    event.stopPropagation();

    if (selectedNode.type === "file") {
      window.alert("Destination is not a directory");
      return;
    }

    this.setState(
      {
        dragdrop: {
          sourceNode: this.state.dragdrop.sourceNode,
          destinationNode: selectedNode
        }
      },
      async () => {
        MoveModal({
          filename: this.state.dragdrop.sourceNode.name,
          destinationPath: selectedNode.path,
          handleOnMove: this.handleOnMove,
          overwrite: this.state.overwrite,
          toggleOverwrite: this.toggleOverwrite
        });
      }
    );
  };

  onDrag = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  onDragOver = event => event.preventDefault();

  onDragStart = (event, selectedNode) => {
    event.stopPropagation();

    this.setState({
      dragdrop: {
        sourceNode: selectedNode,
        destinationNode: this.state.dragdrop.destinationNode
      }
    });
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  render() {
    return (
      <div className="container" style={{ width: this.props.width || "250px" }}>
        <Search basePath={this.BASE_PATH} />
        <div className="indent-root">
          {this.state.nodes.map(node => (
            <div key={node.path}>
              <div
                onClick={event => {
                  this.handleClick(event, node);
                }}
                className="item-wrapper mb"
              >
                {icon.file(node)}
                {node.name}
              </div>

              <TreeNode
                node={node}
                handleClick={this.handleClick}
                handleRightClick={this.handleRightClick}
                onDragStart={this.onDragStart}
                onDrag={this.onDrag}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Tree.propTypes = {
  basePath: PropTypes.string.isRequired,
  width: PropTypes.string
};
