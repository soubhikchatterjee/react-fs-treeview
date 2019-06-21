import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import PropTypes from "prop-types";
import "./modal.css";

const alertModal = ({
  title = "Notification",
  message,
  buttonText = "Okay"
}) => {
  return confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="react-confirm-alert-overlay delete">
          <div className="react-confirm-alert">
            <div className="react-confirm-alert-body">
              <h1>{title}</h1>
              <p>{message}</p>
              <div className="react-confirm-alert-button-group">
                <button className="btn-default pull-right" onClick={onClose}>
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });
};

alertModal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string
};

alertModal.defaultProps = {
  title: "Notification"
};

export default alertModal;
