// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div className="p-6">Cargando...</div>;

  // Si no está logueado
  if (!user) return <Navigate to="/" />;

  // Si está logueado pero no ha verificado su correo
  if (!user.emailVerified) return <Navigate to="/verifica-tu-correo" />;

  return children;
}