import pageNotFound from '../../images/blackhole404.png';
import notFoundStyle from './not-found.module.css';
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <main className={notFoundStyle.main}>
            <p className="text text_type_main-large text_color_inactive mt-15">Страница не найдена</p>
            <p className="text text_type_main-large text_color_inactive mt-5 mb-15">404</p>
            <Link className={`${notFoundStyle.link} text text_type_main-medium text_color_inactive`} to={'/'}>
                <img className={notFoundStyle.img} alt="page not found" src={pageNotFound}/>
                <span>Вернуться на главную</span>
            </Link>
        </main>
    )
}

export default NotFound