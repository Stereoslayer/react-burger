import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const userState = (state) => state.user;

function ProtectedRouteElement({element}) {
    const user = useSelector(userState);
    /*const user = localStorage.getItem('accessToken');*/
    const location = useLocation();

    return (
        user.userData ? element : <Navigate to="/login" state={{prevLocation: location}} replace/>
    )
}

export default ProtectedRouteElement