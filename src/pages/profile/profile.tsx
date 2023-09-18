import React from "react";
import profileStyle from "./profile.module.css";
import {Outlet, useLocation} from "react-router-dom";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";

function Profile() {
    const location = useLocation();
    return (
        <main className={profileStyle.main}>
            {location.pathname === '/profile' || location.pathname === '/profile/orders' ?
                <>
                    <ProfileNavigation/>
                    <Outlet/>
                </> : location.state?.modal ?
                    <>
                        <ProfileNavigation/>
                        <Outlet/>
                    </> :
                    <Outlet/>}
        </main>
    )
}

export default Profile