// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth"; // Importar la función para cerrar sesión

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    const auth = getAuth();
    return signOut(auth); // Aquí se cierra la sesión del usuario
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);