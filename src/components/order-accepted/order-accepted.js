import orderAcceptedStyle from './order-accepted.module.css';
import logo from '../../images/done.svg';
import {number} from "prop-types";

function OrderAccepted({orderNumber}) {
    return (
        <div className={orderAcceptedStyle.box}>
            <h2 className={`${orderAcceptedStyle.title} text text_type_digits-large mt-20`}>{orderNumber}</h2>
            <p className="text text_type_main-medium mt-8">Идентификатор заказа</p>
            <img src={logo} className='m-15' alt={'логотип'}/>
            <div className={`${orderAcceptedStyle.span} mb-15`}>
                <p className="text text_type_main-default">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
                    станции</p>
            </div>
        </div>
    )
}

OrderAccepted.propTypes = {
    orderNumber: number.isRequired
}

export default OrderAccepted