import React from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import icon from "../icon";
import PropTypes from "prop-types";
import "./contextmenu.css";

const TreeNode = props => {
  const {
    node,
    bookmarks,
    currentFile,
    handleClick,
    handleRightClick,
    onDragStart,
    onDrag,
    onDragOver,
    onDrop,
    disableContextMenu
  } = props;

  return (
    <div className="indent">
      {node.children &&
        Object.keys(node.children).map(path => {
          const child = node.children[path];

          return (
            <div
              key={path}
              onClick={event => handleClick(event, child)}
              draggable={true}
              onDragStart={event => onDragStart(event, child)}
              onDrag={onDrag}
              onDragOver={onDragOver}
              onDrop={event => onDrop(event, child)}
            >
              <ContextMenuTrigger disable={disableContextMenu} id={child.path}>
                <div
                  className={
                    currentFile.path === child.path
                      ? "item-wrapper blue mb"
                      : "item-wrapper mb"
                  }
                >
                  {icon.file(child, bookmarks)}
                  {child.name}
                </div>
              </ContextMenuTrigger>
              <ContextMenu id={child.path}>
                <MenuItem
                  data={{ node: child, action: "rename" }}
                  onClick={handleRightClick}
                >
                  Rename
                </MenuItem>
                <MenuItem
                  data={{ node: child, action: "delete" }}
                  onClick={handleRightClick}
                >
                  Delete
                </MenuItem>
                <MenuItem divider />
                <MenuItem
                  data={{ node: child, action: "bookmark" }}
                  onClick={handleRightClick}
                  disabled={child.type === "directory"}
                >
                  {child.bookmarked ? "Remove Bookmark" : "Bookmark"}
                </MenuItem>
              </ContextMenu>
              <TreeNode
                node={child}
                bookmarks={bookmarks}
                currentFile={currentFile}
                handleClick={handleClick}
                handleRightClick={handleRightClick}
                draggable={true}
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragOver={onDragOver}
                onDrop={onDrop}
              />
            </div>
          );
        })}
    </div>
  );
};

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  bookmarks: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleRightClick: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  disableContextMenu: PropTypes.bool
};

export default TreeNode;
