import modalStyle from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect} from "react";
import {createPortal} from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {TModal} from "../../utils/types";


const modalRoot = document.getElementById('react-modals')!;

function Modal({onClose, children}: TModal) {
    const handleEscClose = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            (onClose())
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleEscClose);
        return () => {
            document.removeEventListener('keydown', handleEscClose);
        };
    }, []);

    return createPortal((
        <>
            <ModalOverlay onClose={onClose}/>
            <div className={`${modalStyle.box} pr-10 pl-10 pt-10 pb-10`}>
                <button onClick={onClose} className={modalStyle.button}><CloseIcon type="primary"/></button>
                {children}
            </div>
        </>


    ), modalRoot)
}


export default Modal;