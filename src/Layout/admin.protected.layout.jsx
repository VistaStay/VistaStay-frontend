import { useUser } from "@clerk/clerk-react"; 
import { Navigate, Outlet } from "react-router-dom"; 

const AdminProtectedLayout = () => {
    const { user, isLoaded } = useUser(); 

    if (!isLoaded) {
        return <div>Loading...</div>; 
    }

    if (!user || user.publicMetadata?.role !== "admin") {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default AdminProtectedLayout;
