import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase"; // Asegúrate de que esta ruta es correcta
import { onAuthStateChanged } from "firebase/auth";

// Creamos el contexto de autenticación
export const AuthContext = createContext();

// Exportamos el hook `useAuth` para consumir el contexto más fácilmente
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL, // Asegúrate de incluir el avatar
        });
      } else {
        setUsuario(null); // Si no hay usuario, lo limpiamos
      }
    });

    return () => unsubscribe(); // Limpiar la suscripción al desmontar el componente
  }, []);

  return (
    <AuthContext.Provider value={{ usuario }}>
      {children}
    </AuthContext.Provider>
  );
};