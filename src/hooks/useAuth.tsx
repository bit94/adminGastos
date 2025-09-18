import { jwtDecode } from "jwt-decode";
import { API_ADMIN_BASE_URL } from "../Api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        fetch(`${API_ADMIN_BASE_URL}/auth/validate`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                if (res.status !== 200) {
                    localStorage.removeItem("token");
                    navigate("/login", { replace: true });
                }
            })
            .catch(() => {
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
            });
    }, [navigate]);
}