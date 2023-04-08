import PropTypes from 'prop-types';
import modalOverlayStyle from './modal-overlay.module.css';

function ModalOverlay({onClose, children}) {
    return (
        <div className={modalOverlayStyle.box}>
            {children}
            <div onClick={onClose} className={modalOverlayStyle.overlay}></div>
        </div>
    )
}

ModalOverlay.prototype = {
    onClose: PropTypes.func,
    children: PropTypes.element
}

export default ModalOverlay;