import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../customHooks/useAuth";


const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    
    const checkRole = parseInt(auth.role);
    const pass = parseInt(allowedRoles[0]);

    console.log(`checkRole ${checkRole}`);
    console.log(`pass ${pass}`);

    if (checkRole === pass) {
        console.log("Role is allowed.");
        return (<Outlet/>)
    } else if (auth.email) {
        console.log("Role is not allowed.");
        return (<Navigate to="/unauthorized" state={{ from: location }} replace />)
    } else {
        console.log("User not logged in. Redirecting to login page.");
        return (<Navigate to="/login" state={{ from: location }} replace />)
    }
}


export default RequireAuth;