import modalStyle from './modal.module.css';
import PropTypes from 'prop-types'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {createPortal} from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";


const modalRoot = document.getElementById('react-modals');

function Modal({onClose, children}) {
    const handleEscClose = (e) => {
        if (e.key === 'Escape') {
            (onClose())
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleEscClose);
        return () => {
            document.removeEventListener('keydown', handleEscClose);
        };
    }, []);

    return createPortal((
        <>
            <ModalOverlay onClose={onClose}/>
            <div className={`${modalStyle.box} pr-10 pl-10 pt-10 pb-15`}>
                <button onClick={onClose} className={modalStyle.button}><CloseIcon type="primary"/></button>
                {children}
            </div>
        </>


    ), modalRoot)
}

Modal.prototype = {
    onClose: PropTypes.func,
    children: PropTypes.element
}

export default Modal;