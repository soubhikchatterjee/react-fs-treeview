import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import

import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import "./modal.css";

var renameModal = function renameModal(_ref) {
  var newFileName = _ref.newFileName,
      handleOnChange = _ref.handleOnChange,
      handleOnRename = _ref.handleOnRename;
  return confirmAlert({
    customUI: function customUI(_ref2) {
      var onClose = _ref2.onClose;
      return React.createElement("div", {
        className: "react-confirm-alert-overlay rename"
      }, React.createElement("div", {
        className: "react-confirm-alert"
      }, React.createElement("div", {
        className: "react-confirm-alert-body"
      }, React.createElement("h1", null, "Rename"), React.createElement("p", null, React.createElement("input", {
        type: "text",
        defaultValue: newFileName,
        onChange: handleOnChange
      })), React.createElement("div", {
        className: "react-confirm-alert-button-group"
      }, React.createElement("button", {
        onClick: onClose
      }, "Cancel"), React.createElement("button", {
        className: "btn-danger pull-right",
        onClick: function onClick() {
          handleOnRename();
          onClose();
        }
      }, "Rename")))));
    }
  });
};

export default renameModal;