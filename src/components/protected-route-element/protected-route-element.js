import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const userState = (state) => state.user;

function ProtectedRouteElement({loggedIn, element}) {
    const {userData} = useSelector(userState);
    const location = useLocation();

    return (
        userData && loggedIn ? <Navigate to={"/"} replace/> : !userData && !loggedIn ?
            <Navigate to={"/login"} state={{prevLocation: location}}/> : element
    )
}

export default ProtectedRouteElement