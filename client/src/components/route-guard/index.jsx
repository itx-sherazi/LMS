
import { Fragment } from "react";
import { useLocation, Navigate } from "react-router-dom";

function RouteGuard({ authenticated, user, element }) {
    const location = useLocation();

    console.log("RouteGuard Debug:");
    console.log("Authenticated:", authenticated);
    console.log("User:", user);
    console.log("Current Path:", location.pathname);

    if (authenticated && user?.role === "instructor" && !location.pathname.includes("/instructor")) {
        return <Navigate to="/instructor" replace />;
    }

    if (!authenticated && !location.pathname.includes("/auth")) {
        return <Navigate to="/auth" replace />;
    }

    return <Fragment>{element}</Fragment>;
}

export default RouteGuard;
