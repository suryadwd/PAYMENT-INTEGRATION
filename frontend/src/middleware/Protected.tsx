import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

 const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const hasToken = document.cookie.includes("jwtToken"); // or match against cookie value more robustly
    if (!hasToken) {
      navigate("/auth/login");
    } else {
      setIsAuth(true);
    }
  }, [navigate]);

  if (isAuth === null) return null; // or a loading spinner
  return children;
};

export default ProtectedRoute;