import React from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const Modal = ({children, closeModal, title}) => {
    return createPortal(
        <>
            <div className={styles.modal}>
                <div><span className="text text_type_main-medium">{title}</span><button onClick={closeModal} className={styles.closeButton}>X</button></div>
                {children}
            </div>
            <ModalOverlay closeModal={closeModal}/>
        </>, document.getElementById("portal"));
};

export default Modal;