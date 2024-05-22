import React from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

export type TModalProps = {
    title?: string;
    closeModal: () => void;
}

const Modal = ({ children, closeModal, title }: React.PropsWithChildren<TModalProps>) => {
    const portal = document.getElementById("portal");
    if (portal) {
        return createPortal(
            <>
                <div className={styles.modal} data-cy="modal">
                    <div><span className="text text_type_main-medium">{title}</span><button onClick={closeModal} className={styles.closeButton} data-cy="close-modal">X</button></div>
                    {children}
                </div>
                <ModalOverlay closeModal={closeModal} />
            </>, portal);
    }
    return (<></>);
};

export default Modal;