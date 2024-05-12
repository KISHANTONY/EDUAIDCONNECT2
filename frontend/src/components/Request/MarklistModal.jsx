import React from "react";

const MarklistModal = ({ marklistUrl, certificateUrl, onClose }) => {
  const imageUrl = marklistUrl || certificateUrl;

  return (
    <div className="marklist-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt={marklistUrl ? "Marklist" : "Certificate"} />
      </div>
    </div>
  );
};

export default MarklistModal;