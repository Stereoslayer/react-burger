import modalOverlayStyle from './modal-overlay.module.css';
import {TModalOverlay} from "../../utils/types";

function ModalOverlay({onClose}: TModalOverlay) {
    return (
        <div className={modalOverlayStyle.box}>
            <div onClick={onClose} className={modalOverlayStyle.overlay}></div>
        </div>
    )
}

export default ModalOverlay;