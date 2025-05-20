import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Si el usuario no está autenticado, redirige a la página de login
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
      return null; // Evita que (children) se rendericen
    }
  }, [isLogin, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
