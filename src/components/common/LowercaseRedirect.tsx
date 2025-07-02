import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LowercaseRedirect() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const lowerPath = location.pathname.toLowerCase();
        if (location.pathname !== lowerPath) {
            navigate(lowerPath, { replace: true });
        }
    }, [location.pathname]);

    return null;
}