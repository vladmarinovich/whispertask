import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Para las rutas
import { useState, useEffect } from "react";
import { auth } from "./firebase"; // Asegúrate de que la ruta es correcta
import { onAuthStateChanged } from "firebase/auth"; // Necesitamos verificar el estado de autenticación
import Sidebar from "./components/layout/sidebar/Sidebar"; // Sidebar con menú
import Home from "./pages/home/Home"; // Página de Inicio
import Resumen from "./pages/home/Resumen"; // Página de Resumen IA
import Historial from "./pages/home/Historial"; // Página de Histórico
import Agenda from "./pages/home/Agenda"; // Página de Agenda
import Ajustes from "./pages/home/Ajustes"; // Página de Ajustes
import LoginForm from "./components/LoginForm"; // Página de Login
import { useNavigate } from "react-router-dom";

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // Verificar el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);  // Si hay un usuario logueado, actualizamos el estado
        navigate("/home"); // Redirige a /home si está autenticado
      } else {
        setUsuario(null); // Si no hay usuario, redirige al login
        navigate("/login");
      }
    });

    return () => unsubscribe(); // Limpiar la suscripción al desmontar el componente
  }, [navigate]);

  return (
    <Router>
      <div className="flex">
        {/* Sidebar a la izquierda */}
        {usuario && <Sidebar />} {/* Mostrar Sidebar solo si hay un usuario logueado */}

        {/* Contenido principal */}
        <main className="flex-1 p-6">
          <Routes>
            {/* Página de Login, accesible solo si no hay usuario */}
            <Route path="/login" element={<LoginForm />} />
            
            {/* Páginas protegidas */}
            <Route path="/home" element={usuario ? <Home /> : <LoginForm />} />
            <Route path="/resumen" element={usuario ? <Resumen /> : <LoginForm />} />
            <Route path="/historial" element={usuario ? <Historial /> : <LoginForm />} />
            <Route path="/agenda" element={usuario ? <Agenda /> : <LoginForm />} />
            <Route path="/ajustes" element={usuario ? <Ajustes /> : <LoginForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}