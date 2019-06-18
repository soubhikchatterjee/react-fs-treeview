import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import PropTypes from "prop-types";

const moveModal = ({
  filename,
  destinationPath,
  overwrite,
  toggleOverwrite,
  handleOnMove
}) => {
  return confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="react-confirm-alert-overlay delete">
          <div className="react-confirm-alert">
            <div className="react-confirm-alert-body">
              <h1>Confirm Move</h1>
              <p>
                You are about to move <strong>{filename}</strong>
              </p>
              <p>to</p>
              <p>
                <code className="tomato">{destinationPath}</code>
              </p>
              <div className="divider" />
              <div className="replace-folder-wrapper">
                <div>Replace Folder (if exists):</div>
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={overwrite}
                    onChange={toggleOverwrite}
                  />
                </div>
              </div>
              <div className="react-confirm-alert-button-group">
                <button className="btn-default" onClick={onClose}>
                  Cancel
                </button>
                <button
                  className="btn-danger pull-right"
                  onClick={() => {
                    handleOnMove();
                    onClose();
                  }}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });
};

moveModal.propTypes = {
  handleOnDelete: PropTypes.func.isRequired,
  filename: PropTypes.string.isRequired,
  destinationPath: PropTypes.string.isRequired,
  overwrite: PropTypes.bool.isRequired,
  toggleOverwrite: PropTypes.func.isRequired,
  handleOnMove: PropTypes.func.isRequired
};

export default moveModal;
