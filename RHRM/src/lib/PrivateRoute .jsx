import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/Contextsprovider";

const PrivateRoute = () => {
    const { token } = useStateContext(); // লগইন চেক করা হচ্ছে

    return token ? <Outlet /> : <Navigate to="/login" />; // ✅ যদি টোকেন না থাকে, `/login` এ পাঠাবে
};

export default PrivateRoute;
