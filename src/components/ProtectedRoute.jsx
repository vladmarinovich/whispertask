// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Utiliza el contexto para obtener el estado de autenticación

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); // Extrae el usuario y el estado de carga desde el contexto

  if (loading) {
    // Si aún está cargando, muestra un mensaje o spinner
    return <div>⏳ Cargando...</div>;
  }

  if (!user) {
    // Si el usuario no está autenticado, redirige al login
    return <Navigate to="/" replace />;
  }

  // Si el usuario está autenticado, renderiza los hijos (la página solicitada)
  return children;
}