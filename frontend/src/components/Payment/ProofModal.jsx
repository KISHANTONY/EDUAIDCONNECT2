import React from "react";

const ProofModal = ({ imageUrl, onClose }) => {
  return (
    <div className="proof-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="proof" />
      </div>
    </div>
  );
};

export default ProofModal;
