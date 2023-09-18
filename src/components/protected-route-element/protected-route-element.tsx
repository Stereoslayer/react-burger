import {Navigate, Route, RouteProps, useLocation} from "react-router-dom";
import {RootState, useSelector} from "../../utils/types";

const userState = (state: RootState) => state.user;

function ProtectedRouteElement({loggedIn, element}: RouteProps & { loggedIn: boolean }) {
    const {userData} = useSelector(userState);
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