import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import

import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import "./modal.css";

var alertModal = function alertModal(_ref) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? "Notification" : _ref$title,
      message = _ref.message,
      _ref$buttonText = _ref.buttonText,
      buttonText = _ref$buttonText === void 0 ? "Okay" : _ref$buttonText;
  return confirmAlert({
    customUI: function customUI(_ref2) {
      var onClose = _ref2.onClose;
      return React.createElement("div", {
        className: "react-confirm-alert-overlay delete"
      }, React.createElement("div", {
        className: "react-confirm-alert"
      }, React.createElement("div", {
        className: "react-confirm-alert-body"
      }, React.createElement("h1", null, title), React.createElement("p", null, message), React.createElement("div", {
        className: "react-confirm-alert-button-group"
      }, React.createElement("button", {
        className: "btn-default pull-right",
        onClick: onClose
      }, buttonText)))));
    }
  });
};

alertModal.defaultProps = {
  title: "Notification"
};
export default alertModal;