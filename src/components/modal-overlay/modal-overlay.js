import React from "react";
import { createPortal } from "react-dom";
import styles from './modal-overlay.module.css';

const ModalOverlay = ({closeModal, children}) => {
    return createPortal(
        <div className={styles.overlay} onClick={closeModal}>
            {children}
        </div>,
        document.getElementById("portal")
    );
};

export default ModalOverlay;