import React from "react";

const MarklistModal = ({ marklistUrl, onClose }) => {
  return (
    <div className="marklist-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={marklistUrl} alt="Marklist" />
      </div>
    </div>
  );
};

export default MarklistModal;