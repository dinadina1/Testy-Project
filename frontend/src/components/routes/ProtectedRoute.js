import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute ({children, isAdmin}) {

    const { user, isAuthenticated, loading } = useSelector(state => state.authState);

    if (loading) {
        return (
            <div className="flex justify-center mt-10">
                <Loader />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (isAuthenticated) {
        if (isAdmin && user.role !== "admin") {
            return <Navigate to="/" />;
        }
        return children;
    }

    return null; 
}
