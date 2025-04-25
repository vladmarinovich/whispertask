import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import logo from "../../assets/logo-2.png";
import { useAuth } from "../../context/AuthContext";

export default function Auth() {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        ⏳ Cargando sesión...
      </div>
    );
  }

  if (user) {
    window.location.href = "/home";
    return null;
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#4A9FFF] to-[#326DFF] flex flex-col md:flex-row items-center justify-center relative px-2 md:px-6 gap-x-4">
      
      {/* Columna izquierda (branding sin card) */}
      <div className="w-full md:w-[38%] flex flex-col items-center justify-center text-white text-center py-10 px-4">
        <img src={logo} alt="Whispertask logo" className="w-72 mb-6" />
        <h2 className="text-[30px] font-bold mb-2">Menos notas. Más acción.</h2>
        <p className="text-[20px] text-blue-100 leading-snug">
          Whispertask convierte tus reuniones<br /> en tareas organizadas con IA.
        </p>
      </div>

      {/* Columna derecha (formulario dentro de card blanca) */}
      <div className="w-full md:w-[40%] flex items-center justify-center px-4 md:px-2 py-6">
        <div className="w-full max-w-sm bg-white text-gray-800 rounded-xl shadow-lg p-6">
          

          {isLogin ? <LoginForm /> : <RegisterForm />}

          <div className="text-center mt-6 text-sm text-gray-600">
            {isLogin ? (
              <p>
                ¿Aún no tienes una cuenta?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-[#4A9FFF] font-semibold hover:underline"
                >
                  Regístrate
                </button>
              </p>
            ) : (
              <p>
                ¿Ya tienes una cuenta?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-[#4A9FFF] font-semibold hover:underline"
                >
                  Inicia sesión
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 w-full text-center text-xs text-white opacity-80">
        Desarrollado por Vladislav Marinovich ·{" "}
        <a
          href="https://wa.me/573241688597"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-white"
        >
          +57 324 168 8597
        </a>
      </footer>
    </div>
  );
}