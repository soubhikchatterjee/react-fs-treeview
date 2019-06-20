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
import AlertModal from "./Modals/alert";

export default class Tree extends React.Component {
  BASE_PATH = this.props.basePath;

  state = {
    nodes: {},
    newFileName: "",
    currentFile: {
      name: "",
      path: ""
    },
    bookmarks: {},
    overwrite: false,
    dragdrop: {
      sourceNode: {},
      destinationNode: {}
    }
  };

  _getRootNode() {
    return {
      [this.BASE_PATH]: {
        name: path.basename(this.BASE_PATH),
        path: this.BASE_PATH,
        type: "directory",
        size: 0,
        isOpen: false,
        bookmarked: false,
        children: {}
      }
    };
  }

  componentDidMount() {
    let bookmarks = localStorage.getItem("bookmarks");

    this.setState({
      nodes: this._getRootNode(),
      bookmarks: bookmarks ? JSON.parse(bookmarks) : {}
    });

    // Open first level folders
    this.openFolders();
  }

  openFolders = async () => {
    const rootNode = this._getRootNode()[this.BASE_PATH];
    const children = await this.getChildNodes(rootNode);
    rootNode.children = children;
    rootNode.isOpen = true;

    for (const path in children) {
      if (children.hasOwnProperty(path)) {
        const node = children[path];

        if (node.type === "directory") {
          const subChildren = await this.getChildNodes(node);
          node.children = { ...subChildren };
          node.isOpen = true;
        }
      }
    }

    this.setState({
      nodes: { rootNode }
    });
  };

  getChildNodes = async node => {
    if (!node.children) {
      return {};
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

    if (selectedNode.type === "file") {
      this.setState({
        currentFile: {
          name: selectedNode.name,
          path: selectedNode.path
        }
      });
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
    try {
      const response = await request.dragDrop({
        source: this.state.dragdrop.sourceNode.path,
        destination: this.state.dragdrop.destinationNode.path,
        overwrite: this.state.overwrite
      });
      if (response.status === 201) {
        this.removeItem(this.state.nodes, this.state.dragdrop.sourceNode);
        this.emptyChildren(
          this.state.nodes,
          this.state.dragdrop.destinationNode
        );
      }
    } catch (error) {
      AlertModal({
        title: "Error",
        message: "Item already exists in the destination"
      });
    }

    this.setState({
      overwrite: false
    });
  };

  handleOnRename = async selectedNode => {
    try {
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
    } catch (error) {
      AlertModal({
        title: "Error",
        message: `A ${
          selectedNode.type === "file" ? "file" : "folder"
        } with that name already exists`
      });
    }
  };

  handleOnDelete = async selectedNode => {
    const response = await request.deleteNode(selectedNode.path);
    if (response === 200) {
      this.removeItem(this.state.nodes, selectedNode);
    }
  };

  handleRemoveBookmark = node => {
    let bookmarks = localStorage.getItem("bookmarks");
    bookmarks = JSON.parse(bookmarks);

    delete bookmarks[node.path];

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    this.setState({
      bookmarks
    });
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

    // Bookmark a node
    if (action === "bookmark") {
      if (selectedNode.bookmarked) {
        selectedNode.bookmarked = false;
        // Remove the item from the bookmark history
        let bookmarks = this.state.bookmarks;
        delete bookmarks[selectedNode.path];

        // Update localstorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

        this.setState({
          bookmarks
        });
      } else {
        selectedNode.bookmarked = true;

        const bookmarks = {
          ...this.state.bookmarks,
          [selectedNode.path]: selectedNode
        };

        // Add to localstorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

        // Add the item to the bookmark history
        this.setState({
          bookmarks
        });
      }

      const newNodes = this.state.nodes;
      this.setState({
        nodes: newNodes
      });
    }
  };

  handleBookmarkClick = async selectedBookmark => {
    console.log("handleBookmarkClick", selectedBookmark);
  };

  // Adds children to a selected folder
  addToChildren = (nodes, selectedNode, newChildren) => {
    for (const path in nodes) {
      const iterator = nodes[path];

      if (iterator.type === "file") {
        continue;
      }

      if (selectedNode.path.includes(iterator.path)) {
        // If its exactly the same path append the new node in its children array
        if (selectedNode.path === iterator.path) {
          // iterator.children.unshift(...newChildren);
          iterator.children = { ...newChildren, ...iterator.children };

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
    for (let path in nodes) {
      const iterator = nodes[path];

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
    for (const path in nodes) {
      const iterator = nodes[path];

      if (selectedNode.path.includes(iterator.path)) {
        // If its exactly the same path append the new node in its children object
        if (selectedNode.path === iterator.path) {
          // Add the element to the nodes object
          nodes[path] = {
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
    for (const path in nodes) {
      const iterator = nodes[path];

      if (selectedNode.path.includes(iterator.path)) {
        // If its exactly the same path append the new node in its children array
        if (selectedNode.path === iterator.path) {
          // Remove the element from the nodes array
          // nodes.splice(path, 1);
          delete nodes[path];

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
      AlertModal({
        title: "Error",
        message: "Destination is not a directory"
      });
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
      <div className="container" style={this.props.styles}>
        <Search
          basePath={this.BASE_PATH}
          bookmarks={this.state.bookmarks}
          handleBookmarkClick={this.handleBookmarkClick}
          handleRemoveBookmark={this.handleRemoveBookmark}
        />
        <div className="indent-root">
          {Object.keys(this.state.nodes).map(path => {
            const node = this.state.nodes[path];

            return (
              <div key={path}>
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
                  bookmarks={this.state.bookmarks}
                  currentFile={this.state.currentFile}
                  handleClick={this.handleClick}
                  handleRightClick={this.handleRightClick}
                  onDragStart={this.onDragStart}
                  onDrag={this.onDrag}
                  onDragOver={this.onDragOver}
                  onDrop={this.onDrop}
                  disableContextMenu={this.props.disableContextMenu}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Tree.propTypes = {
  styles: PropTypes.object,
  basePath: PropTypes.string.isRequired,
  disableContextMenu: PropTypes.bool
};
