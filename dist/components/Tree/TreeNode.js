import React from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import icon from "../icon";
import "./contextmenu.css";

var TreeNode = function TreeNode(props) {
  var node = props.node,
      bookmarks = props.bookmarks,
      currentFile = props.currentFile,
      handleClick = props.handleClick,
      handleRightClick = props.handleRightClick,
      _onDragStart = props.onDragStart,
      onDrag = props.onDrag,
      onDragOver = props.onDragOver,
      _onDrop = props.onDrop,
      disableContextMenu = props.disableContextMenu;
  return React.createElement("div", {
    className: "indent"
  }, node.children && Object.keys(node.children).map(function (path) {
    var child = node.children[path];
    return React.createElement("div", {
      key: path,
      onClick: function onClick(event) {
        return handleClick(event, child);
      },
      draggable: true,
      onDragStart: function onDragStart(event) {
        return _onDragStart(event, child);
      },
      onDrag: onDrag,
      onDragOver: onDragOver,
      onDrop: function onDrop(event) {
        return _onDrop(event, child);
      }
    }, React.createElement(ContextMenuTrigger, {
      disable: disableContextMenu,
      id: child.path
    }, React.createElement("div", {
      className: currentFile.path === child.path ? "item-wrapper blue mb" : "item-wrapper mb"
    }, icon.file(child, bookmarks), child.name)), React.createElement(ContextMenu, {
      id: child.path
    }, React.createElement(MenuItem, {
      data: {
        node: child,
        action: "rename"
      },
      onClick: handleRightClick
    }, "Rename"), React.createElement(MenuItem, {
      data: {
        node: child,
        action: "delete"
      },
      onClick: handleRightClick
    }, "Delete"), React.createElement(MenuItem, {
      divider: true
    }), React.createElement(MenuItem, {
      data: {
        node: child,
        action: "bookmark"
      },
      onClick: handleRightClick,
      disabled: child.type === "directory"
    }, child.bookmarked ? "Remove Bookmark" : "Bookmark")), React.createElement(TreeNode, {
      node: child,
      bookmarks: bookmarks,
      currentFile: currentFile,
      handleClick: handleClick,
      handleRightClick: handleRightClick,
      draggable: true,
      onDragStart: _onDragStart,
      onDrag: onDrag,
      onDragOver: onDragOver,
      onDrop: _onDrop,
      disableContextMenu: disableContextMenu
    }));
  }));
};

export default TreeNode;