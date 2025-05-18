import React from 'react';
import './Modal.scss'


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}><img src="flechaAtras.png" alt="" /></button>
        {children}
      </div>
    </div>
  );
};

export default Modal;