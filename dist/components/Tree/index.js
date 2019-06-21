import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React from "react";
import path from "path";
import request from "../../services/request";
import TreeNode from "./TreeNode";
import icon from "../icon";
import Search from "../Search";
import RenameModal from "../Modals/rename";
import DeleteModal from "../Modals/delete";
import MoveModal from "../Modals/move";
import AlertModal from "../Modals/alert";

var Tree =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tree, _React$Component);

  function Tree() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tree);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tree)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
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
    _this.openFolders =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      var rootNode, children, _path, node, subChildren;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              rootNode = _this._getRootNode()[_this.props.basePath];
              _context.next = 3;
              return _this.getChildNodes(rootNode);

            case 3:
              children = _context.sent;
              rootNode.children = children;
              rootNode.isOpen = true;
              _context.t0 = _regeneratorRuntime.keys(children);

            case 7:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 19;
                break;
              }

              _path = _context.t1.value;

              if (!children.hasOwnProperty(_path)) {
                _context.next = 17;
                break;
              }

              node = children[_path];

              if (!(node.type === "directory")) {
                _context.next = 17;
                break;
              }

              _context.next = 14;
              return _this.getChildNodes(node);

            case 14:
              subChildren = _context.sent;
              node.children = _objectSpread({}, subChildren);
              node.isOpen = true;

            case 17:
              _context.next = 7;
              break;

            case 19:
              _this.setState({
                nodes: {
                  rootNode: rootNode
                }
              });

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    _this.getChildNodes =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(node) {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (node.children) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", {});

              case 2:
                _context2.next = 4;
                return request.tree(node.path);

              case 4:
                return _context2.abrupt("return", _context2.sent);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.handleClick =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(event, selectedNode) {
        var newChildren;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                event.stopPropagation(); // If folder is clicked and the folder is already open, we will close it

                if (!(selectedNode.isOpen === true)) {
                  _context3.next = 5;
                  break;
                }

                _this.emptyChildren(_this.state.nodes, selectedNode);

                selectedNode.isOpen = false;
                return _context3.abrupt("return");

              case 5:
                if (selectedNode.type === "file") {
                  _this.setState({
                    currentFile: {
                      name: selectedNode.name,
                      path: selectedNode.path
                    }
                  });
                }

                selectedNode.isOpen = !selectedNode.isOpen; // Get children of a selected node

                _context3.next = 9;
                return _this.getChildNodes(selectedNode);

              case 9:
                newChildren = _context3.sent;

                // Add the new children to the selected folder
                _this.addToChildren(_this.state.nodes, selectedNode, newChildren); // Propagate the selected item to the parent component


                _this.props.onItemSelected(selectedNode);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.handleOnChange = function (event) {
      _this.setState({
        newFileName: event.target.value
      });
    };

    _this.handleOnMove =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee4() {
      var response;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return request.dragDrop({
                source: _this.state.dragdrop.sourceNode.path,
                destination: _this.state.dragdrop.destinationNode.path,
                overwrite: _this.state.overwrite
              });

            case 3:
              response = _context4.sent;

              if (response.status === 201) {
                _this.removeItem(_this.state.nodes, _this.state.dragdrop.sourceNode);

                _this.emptyChildren(_this.state.nodes, _this.state.dragdrop.destinationNode);
              }

              _context4.next = 10;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              AlertModal({
                title: "Error",
                message: "Item already exists in the destination"
              });

            case 10:
              _this.setState({
                overwrite: false
              });

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 7]]);
    }));

    _this.handleOnRename =
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(selectedNode) {
        var response;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return request.renameNode({
                  oldPath: selectedNode.path,
                  newFileName: _this.state.newFileName
                });

              case 3:
                response = _context5.sent;

                if (response.status === 200) {
                  // Add the Item to state
                  _this.addItem(_this.state.nodes, _objectSpread({}, selectedNode, {
                    newName: _this.state.newFileName,
                    newPath: response.data.newFilePath
                  }));
                }

                _context5.next = 10;
                break;

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);
                AlertModal({
                  title: "Error",
                  message: "A ".concat(selectedNode.type === "file" ? "file" : "folder", " with that name already exists")
                });

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 7]]);
      }));

      return function (_x4) {
        return _ref5.apply(this, arguments);
      };
    }();

    _this.handleOnDelete =
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(selectedNode) {
        var response;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return request.deleteNode(selectedNode.path);

              case 2:
                response = _context6.sent;

                if (response === 200) {
                  _this.removeItem(_this.state.nodes, selectedNode);
                }

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x5) {
        return _ref6.apply(this, arguments);
      };
    }();

    _this.handleRemoveBookmark = function (node) {
      var bookmarks = localStorage.getItem("bookmarks");
      bookmarks = JSON.parse(bookmarks);
      delete bookmarks[node.path];
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

      _this.setState({
        bookmarks: bookmarks
      });
    };

    _this.handleRightClick = function (event, data) {
      event.stopPropagation();
      var action = data.action,
          selectedNode = data.node; // Rename a node

      if (action === "rename") {
        _this.setState({
          newFileName: selectedNode.name
        }, function () {
          RenameModal({
            selectedNode: selectedNode,
            newFileName: _this.state.newFileName,
            handleOnChange: _this.handleOnChange,
            handleOnRename: function handleOnRename() {
              return _this.handleOnRename(selectedNode);
            }
          });
        });
      } // Delete a node


      if (action === "delete") {
        DeleteModal({
          path: selectedNode.path,
          handleOnDelete: function handleOnDelete() {
            return _this.handleOnDelete(selectedNode);
          }
        });
      } // Bookmark a node


      if (action === "bookmark") {
        if (selectedNode.bookmarked) {
          selectedNode.bookmarked = false; // Remove the item from the bookmark history

          var bookmarks = _this.state.bookmarks;
          delete bookmarks[selectedNode.path]; // Update localstorage

          localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

          _this.setState({
            bookmarks: bookmarks
          });
        } else {
          selectedNode.bookmarked = true;

          var _bookmarks = _objectSpread({}, _this.state.bookmarks, _defineProperty({}, selectedNode.path, selectedNode)); // Add to localstorage


          localStorage.setItem("bookmarks", JSON.stringify(_bookmarks)); // Add the item to the bookmark history

          _this.setState({
            bookmarks: _bookmarks
          });
        }

        var newNodes = _this.state.nodes;

        _this.setState({
          nodes: newNodes
        });
      }
    };

    _this.handleBookmarkClick =
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(selectedBookmark) {
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", _this.props.onItemSelected(selectedBookmark));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x6) {
        return _ref7.apply(this, arguments);
      };
    }();

    _this.addToChildren = function (nodes, selectedNode, newChildren) {
      for (var _path2 in nodes) {
        var iterator = nodes[_path2];

        if (iterator.type === "file") {
          continue;
        }

        if (selectedNode.path.includes(iterator.path)) {
          // If its exactly the same path append the new node in its children array
          if (selectedNode.path === iterator.path) {
            iterator.children = _objectSpread({}, newChildren, iterator.children); // Prepare a new version of the current state

            var newNodes = _this.state.nodes; // Set the new state

            _this.setState({
              nodes: newNodes
            });

            break;
          } else {
            // If its a partial match, then get inside its children and perform iteration until exact match is not found
            return _this.addToChildren(iterator.children, selectedNode, newChildren);
          }
        }
      }
    };

    _this.emptyChildren = function (nodes, selectedNode) {
      for (var _path3 in nodes) {
        var iterator = nodes[_path3];

        if (iterator.type === "file") {
          continue;
        }

        if (selectedNode.path.includes(iterator.path)) {
          // If its exactly the same path append the new node in its children array
          if (selectedNode.path === iterator.path) {
            iterator.children = [];
            iterator.isOpen = false; // Prepare a new version of the current state

            var newNodes = _this.state.nodes; // Set the new state

            _this.setState({
              nodes: newNodes
            });

            break;
          } else {
            // If its a partial match, then get inside its children and perform iteration until exact match is not found
            return _this.emptyChildren(iterator.children, selectedNode);
          }
        }
      }
    };

    _this.addItem = function (nodes, selectedNode) {
      for (var _path4 in nodes) {
        var iterator = nodes[_path4];

        if (selectedNode.path.includes(iterator.path)) {
          // If its exactly the same path append the new node in its children object
          if (selectedNode.path === iterator.path) {
            // Add the element to the nodes object
            nodes[_path4] = _objectSpread({}, selectedNode, {
              name: selectedNode.newName,
              path: selectedNode.newPath
            }); // Prepare a new version of the current state

            var newNodes = _this.state.nodes; // Set the new state

            _this.setState({
              nodes: newNodes
            });

            break;
          } else {
            // If its a partial match, then get inside its children and perform iteration until exact match is not found
            return _this.addItem(iterator.children, selectedNode);
          }
        }
      }
    };

    _this.removeItem = function (nodes, selectedNode) {
      for (var _path5 in nodes) {
        var iterator = nodes[_path5];

        if (selectedNode.path.includes(iterator.path)) {
          // If its exactly the same path append the new node in its children array
          if (selectedNode.path === iterator.path) {
            // Remove the element from the nodes array
            // nodes.splice(path, 1);
            delete nodes[_path5]; // Prepare a new version of the current state

            var newNodes = _this.state.nodes; // Set the new state

            _this.setState({
              nodes: newNodes
            });

            break;
          } else {
            // If its a partial match, then get inside its children and perform iteration until exact match is not found
            return _this.removeItem(iterator.children, selectedNode);
          }
        }
      }
    };

    _this.toggleOverwrite = function () {
      _this.setState({
        overwrite: !_this.state.overwrite
      });
    };

    _this.onDrop = function (event, selectedNode) {
      event.preventDefault();
      event.stopPropagation();

      if (selectedNode.type === "file") {
        AlertModal({
          title: "Error",
          message: "Destination is not a directory"
        });
        return;
      }

      _this.setState({
        dragdrop: {
          sourceNode: _this.state.dragdrop.sourceNode,
          destinationNode: selectedNode
        }
      },
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8() {
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                MoveModal({
                  filename: _this.state.dragdrop.sourceNode.name,
                  destinationPath: selectedNode.path,
                  handleOnMove: _this.handleOnMove,
                  overwrite: _this.state.overwrite,
                  toggleOverwrite: _this.toggleOverwrite
                });

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      })));
    };

    _this.onDrag = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };

    _this.onDragOver = function (event) {
      return event.preventDefault();
    };

    _this.onDragStart = function (event, selectedNode) {
      event.stopPropagation();

      _this.setState({
        dragdrop: {
          sourceNode: selectedNode,
          destinationNode: _this.state.dragdrop.destinationNode
        }
      });

      event.dataTransfer.setData("text/plain", event.target.id);
    };

    return _this;
  }

  _createClass(Tree, [{
    key: "_getRootNode",
    value: function _getRootNode() {
      return _defineProperty({}, this.props.basePath, {
        name: path.basename(this.props.basePath),
        path: this.props.basePath,
        type: "directory",
        size: 0,
        isOpen: false,
        bookmarked: false,
        children: {}
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var bookmarks = localStorage.getItem("bookmarks");
      this.setState({
        nodes: this._getRootNode(),
        bookmarks: bookmarks ? JSON.parse(bookmarks) : {}
      }); // Open first level folders

      this.openFolders();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("div", {
        className: "container",
        style: this.props.styles
      }, React.createElement(Search, {
        basePath: this.props.basePath,
        bookmarks: this.state.bookmarks,
        onItemSelected: this.props.onItemSelected,
        handleBookmarkClick: this.handleBookmarkClick,
        handleRemoveBookmark: this.handleRemoveBookmark
      }), React.createElement("div", {
        className: "indent-root"
      }, Object.keys(this.state.nodes).map(function (path) {
        var node = _this2.state.nodes[path];
        return React.createElement("div", {
          key: path
        }, React.createElement("div", {
          onClick: function onClick(event) {
            _this2.handleClick(event, node);
          },
          className: "item-wrapper mb"
        }, icon.file(node), node.name), React.createElement(TreeNode, {
          node: node,
          bookmarks: _this2.state.bookmarks,
          currentFile: _this2.state.currentFile,
          handleClick: _this2.handleClick,
          handleRightClick: _this2.handleRightClick,
          onDragStart: _this2.onDragStart,
          onDrag: _this2.onDrag,
          onDragOver: _this2.onDragOver,
          onDrop: _this2.onDrop,
          disableContextMenu: _this2.props.disableContextMenu
        }));
      })));
    }
  }]);

  return Tree;
}(React.Component);

Tree.defaultProps = {
  basePath: "Missing 'basePath' props...",
  disableContextMenu: false
};
export default Tree;