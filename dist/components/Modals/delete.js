import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import

import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import "./modal.css";

var deleteModal = function deleteModal(_ref) {
  var path = _ref.path,
      handleOnDelete = _ref.handleOnDelete;
  return confirmAlert({
    customUI: function customUI(_ref2) {
      var onClose = _ref2.onClose;
      return React.createElement("div", {
        className: "react-confirm-alert-overlay delete"
      }, React.createElement("div", {
        className: "react-confirm-alert"
      }, React.createElement("div", {
        className: "react-confirm-alert-body"
      }, React.createElement("h1", null, "Delete Confirmation"), React.createElement("p", null, "You are about to delete ", React.createElement("code", null, path)), React.createElement("div", {
        className: "react-confirm-alert-button-group"
      }, React.createElement("button", {
        className: "btn-default",
        onClick: onClose
      }, "Cancel"), React.createElement("button", {
        className: "btn-danger pull-right",
        onClick: function onClick() {
          handleOnDelete();
          onClose();
        }
      }, "Delete")))));
    }
  });
};

export default deleteModal;