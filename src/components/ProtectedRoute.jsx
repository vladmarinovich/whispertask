import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-10 text-center text-gray-600">Cargando sesión...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}