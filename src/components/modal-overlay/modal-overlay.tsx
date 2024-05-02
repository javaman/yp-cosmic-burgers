import React from "react";
import styles from './modal-overlay.module.css';

export type TModalOverlayProps = {
    closeModal: () => void
}

const ModalOverlay = ({closeModal, children} : React.PropsWithChildren<TModalOverlayProps>) => {

    function handleEscape(e : KeyboardEvent) {
        if (e.key === 'Escape') {
            closeModal();
        }
     }
     React.useEffect(() => {
         window.addEventListener("keydown", handleEscape);
         return () => {
             window.removeEventListener("keydown", handleEscape);
         };
    // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

    return (
        <div className={styles.overlay} onClick={closeModal}>
            {children}
        </div>
    );
};

export default ModalOverlay;