import React, { useEffect } from 'react';
import './style.css';

type ModalProps = {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
};

const Modal = ({ onClose, isOpen, children }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const closeModal = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.matches('.close')) {
      onClose();
    }
  };

  if (isOpen)
    return (
      <div className="modal close" onClick={closeModal}>
        <div className="modal__container">
          <div className="modal__close" onClick={onClose}>
            X
          </div>
          <div>{children}</div>
        </div>
      </div>
    );
  return null;
};

export default Modal;
