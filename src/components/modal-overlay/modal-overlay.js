import React from "react";
import { createPortal } from "react-dom";
import styles from './modal-overlay.module.css';

const ModalOverlay = ({closeModal, children}) => {

    function handleEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
     }
     React.useEffect(() => {
         window.addEventListener("keydown", handleEscape);
         return () => {
             window.removeEventListener("keydown", handleEscape);
         };
     }, [closeModal]);

    return (
        <div className={styles.overlay} onClick={closeModal}>
            {children}
        </div>
    );
};

export default ModalOverlay;