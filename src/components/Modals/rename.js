import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export default ({ newFileName, handleOnChange, handleOnRename }) => {
  return confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="react-confirm-alert-overlay rename">
          <div className="react-confirm-alert">
            <div className="react-confirm-alert-body">
              <h1>Rename</h1>
              <p>
                <input
                  type="text"
                  defaultValue={newFileName}
                  onChange={handleOnChange}
                />
              </p>
              <div className="react-confirm-alert-button-group">
                <button onClick={onClose}>Cancel</button>
                <button
                  className="btn-danger pull-right"
                  onClick={() => {
                    handleOnRename();
                    onClose();
                  }}
                >
                  Rename
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });
};
