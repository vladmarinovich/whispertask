import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import logo from "../../assets/logo-2.png";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#4A9FFF] to-[#326DFF] flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl h-auto items-center justify-center">
        
        {/* Columna izquierda - mismo fondo, sin tarjeta blanca */}
        <div className="w-full md:w-1/2 text-white flex flex-col items-center justify-center px-6 md:px-12 mb-8 md:mb-0">
          <img src={logo} alt="Whispertask logo" className="w-72 md:w-72 mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">Menos notas. Más acción.</h2>
          <p className="text-center text-blue-100 text-base">
            Whispertask convierte tus reuniones<br />
            en tareas organizadas con IA.
          </p>
        </div>

        {/* Columna derecha - la única tarjeta blanca */}
        <div className="w-full md:w-1/2">
          <div className="w-full max-w-md mx-auto bg-white rounded-md shadow-xl p-8">
            {isLogin ? <LoginForm /> : <RegisterForm />}
            <div className="text-center mt-6">
              {isLogin ? (
                <p className="text-sm text-gray-600">
                  ¿Aún no tienes una cuenta?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-[#4A9FFF] font-semibold hover:underline"
                  >
                    Regístrate
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
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

      </div>
    </div>
  );
}