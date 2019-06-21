import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import

import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import "./modal.css";

var moveModal = function moveModal(_ref) {
  var filename = _ref.filename,
      destinationPath = _ref.destinationPath,
      overwrite = _ref.overwrite,
      toggleOverwrite = _ref.toggleOverwrite,
      handleOnMove = _ref.handleOnMove;
  return confirmAlert({
    customUI: function customUI(_ref2) {
      var onClose = _ref2.onClose;
      return React.createElement("div", {
        className: "react-confirm-alert-overlay delete"
      }, React.createElement("div", {
        className: "react-confirm-alert"
      }, React.createElement("div", {
        className: "react-confirm-alert-body"
      }, React.createElement("h1", null, "Confirm Move"), React.createElement("p", null, "You are about to move ", React.createElement("strong", null, filename)), React.createElement("p", null, "to"), React.createElement("p", null, React.createElement("code", {
        className: "react-fs-treeview tomato"
      }, destinationPath)), React.createElement("div", {
        className: "divider"
      }), React.createElement("div", {
        className: "replace-folder-wrapper"
      }, React.createElement("div", null, "Replace Folder/File (if exists):"), React.createElement("div", null, React.createElement("input", {
        type: "checkbox",
        defaultChecked: overwrite,
        onChange: toggleOverwrite
      }))), React.createElement("div", {
        className: "react-confirm-alert-button-group"
      }, React.createElement("button", {
        className: "btn-default",
        onClick: onClose
      }, "Cancel"), React.createElement("button", {
        className: "btn-danger pull-right",
        onClick: function onClick() {
          handleOnMove();
          onClose();
        }
      }, "Move")))));
    }
  });
};

export default moveModal;