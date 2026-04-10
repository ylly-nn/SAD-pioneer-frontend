import { useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";
import type { JSX } from "react/jsx-runtime";

const ProtectedAdminRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        await api.get("/admin/partner-requests/");
        setIsAdmin(true);
      } catch (err) {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) return <div>Проверка доступа...</div>;

  if (!isAdmin) {
    return <Navigate to="/" state={{
          toast: {
            message: "У нет доступа к этому разделу",
            type: "error",
          },
        }} replace />;
  }

  return children;
};

export default ProtectedAdminRoute;