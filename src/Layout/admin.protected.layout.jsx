import { useUser } from "@clerk/clerk-react"; // ✅ Import this
import { Navigate, Outlet } from "react-router-dom"; // ✅ Correct import

const AdminProtectedLayout = () => {
    const { user, isLoaded } = useUser(); // Ensure user is loaded before accessing

    if (!isLoaded) {
        return <div>Loading...</div>; // Prevents accessing undefined user data
    }

    if (!user || user.publicMetadata?.role !== "admin") {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default AdminProtectedLayout;
