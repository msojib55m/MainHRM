import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/Contextsprovider";
import "../index.css";
import Heder from "../lib/Heder.jsx";
export default function DefaulyLaout() {
    const { user, token } = useStateContext();
    if (!token) {
        return <Navigate to="login" />;
    }
    return (
        <main>
            <div>
                <Heder />
            </div>
            <Outlet />
        </main>
    );
}
