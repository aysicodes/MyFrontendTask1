// src/components/ConfirmModal.jsx
import React from "react";

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Are you sure you want to delete this entry?</p>
        <button onClick={onConfirm} style={{ color: "red" }}>
          Delete
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmModal;
