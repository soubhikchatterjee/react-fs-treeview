import React from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import icon from "./fontawesome";
import PropTypes from "prop-types";

const TreeNode = props => {
  const {
    node,
    currentFile,
    handleClick,
    handleRightClick,
    onDragStart,
    onDrag,
    onDragOver,
    onDrop
  } = props;

  return (
    <div className="indent">
      {node.children &&
        node.children.map(child => (
          <div
            key={child.path}
            onClick={event => handleClick(event, child)}
            draggable={true}
            onDragStart={event => onDragStart(event, child)}
            onDrag={onDrag}
            onDragOver={onDragOver}
            onDrop={event => onDrop(event, child)}
          >
            <ContextMenuTrigger id={child.path}>
              <div
                className={
                  currentFile.path === child.path
                    ? "item-wrapper blue mb"
                    : "item-wrapper mb"
                }
              >
                {icon.file(child)}
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
              >
                {child.bookmarked ? "Remove Bookmark" : "Bookmark"}
              </MenuItem>
            </ContextMenu>
            <TreeNode
              node={child}
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
        ))}
    </div>
  );
};

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleRightClick: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
};

export default TreeNode;
