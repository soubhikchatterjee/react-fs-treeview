import React from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import icon from "./fontawesome";

const TreeNode = props => {
  const { node, handleClick, handleRightClick } = props;

  return (
    <div className="indent">
      {node.children &&
        node.children.map(child => (
          <div
            key={child.path}
            className="mb"
            onClick={event => handleClick(event, child)}
          >
            <ContextMenuTrigger id={child.path}>
              <div className="item-wrapper mb">
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
            </ContextMenu>
            <TreeNode
              node={child}
              handleClick={handleClick}
              handleRightClick={handleRightClick}
            />
          </div>
        ))}
    </div>
  );
};

export default TreeNode;
