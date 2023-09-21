import {Navigate, RouteProps, useLocation} from "react-router-dom";
import {useSelector} from "../../utils/types";

function ProtectedRouteElement({loggedIn, element}: RouteProps & { loggedIn: boolean }) {
    const {userData} = useSelector((state) => state.user);
    const location = useLocation();

    return (
        <>
            {
                userData && loggedIn ? (<Navigate to={"/"} replace/>) :
                    !userData && !loggedIn ? (<Navigate to={"/login"} state={{prevLocation: location}}/>) :
                        element
            }
        </>
    )
}

export default ProtectedRouteElement