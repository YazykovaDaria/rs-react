import React from 'react';
import './style.css';

type ModalProps = {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
};

const Modal = ({ onClose, isOpen, children }: ModalProps) => {
  const closeModal = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.matches('.close')) {
      onClose();
    }
  };

  if (isOpen)
    return (
      <div className="modal close" onClick={closeModal}>
        <div>{children}</div>
      </div>
    );
  return null;
};

export default Modal;
