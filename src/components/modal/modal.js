import React from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const Modal = ({children, closeModal, title}) => {
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
        <ModalOverlay closeModal={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div><span className="text text_type_main-medium">{title}</span><button onClick={closeModal} className={styles.closeButton}>X</button></div>
                {children}
            </div>
        </ModalOverlay>
    );
};

export default Modal;