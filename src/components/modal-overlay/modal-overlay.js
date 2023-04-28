import PropTypes from 'prop-types';
import modalOverlayStyle from './modal-overlay.module.css';

function ModalOverlay({onClose}) {
    return (
        <div className={modalOverlayStyle.box}>
            <div onClick={onClose} className={modalOverlayStyle.overlay}></div>
        </div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;