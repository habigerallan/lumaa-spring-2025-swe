import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Tasks from "../pages/TasksPage";
import { JSX } from "react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

const AppRouter = () => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/tasks" />} />
    </Routes>
);

export default AppRouter;
