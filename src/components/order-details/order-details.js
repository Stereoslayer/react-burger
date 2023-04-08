import orderDetailsStyle from './order-details.module.css';
import logo from '../../images/done.svg';

function OrderDetails() {
    return (
        <div className={orderDetailsStyle.box}>
            <h2 className={`${orderDetailsStyle.title} text text_type_digits-large mt-20`}>034536</h2>
            <p className="text text_type_main-medium mt-8">Идентификатор заказа</p>
            <img src={logo} className='m-15'/>
            <div className={`${orderDetailsStyle.span} mb-15`}>
                <p className="text text_type_main-default">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
                    станции</p>
            </div>
        </div>
    )
}

export default OrderDetails