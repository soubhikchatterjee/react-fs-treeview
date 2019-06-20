import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import PropTypes from "prop-types";

const deleteModal = ({ path, handleOnDelete }) => {
  return confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="react-confirm-alert-overlay delete">
          <div className="react-confirm-alert">
            <div className="react-confirm-alert-body">
              <h1>Delete Confirmation</h1>
              <p>
                You are about to delete <code>{path}</code>
              </p>
              <div className="react-confirm-alert-button-group">
                <button className="btn-default" onClick={onClose}>
                  Cancel
                </button>
                <button
                  className="btn-danger pull-right"
                  onClick={() => {
                    handleOnDelete();
                    onClose();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });
};

deleteModal.propTypes = {
  path: PropTypes.string.isRequired,
  handleOnDelete: PropTypes.func.isRequired
};

export default deleteModal;
