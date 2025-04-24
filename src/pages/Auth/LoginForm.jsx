import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Login con email y contraseña
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Sesión iniciada correctamente");
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Correo o contraseña incorrectos.");
    }
  };

  // Login con Google
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      console.log("Inicio de sesión con Google exitoso");
      navigate("/home");
    } catch (error) {
      console.error("Error con Google login:", error);
      setError("Error al iniciar sesión con Google.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Inicia sesión</h2>
        <p className="text-sm text-gray-600">
          Gestiona tus tareas desde aquí. Sin notas, sin estrés.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-[#4A9FFF] focus:border-[#4A9FFF]"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-[#4A9FFF] focus:border-[#4A9FFF]"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="text-right">
          <a href="#" className="text-sm text-[#4A9FFF] hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-[#4A9FFF] hover:bg-[#326DFF] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Iniciar sesión
        </button>
      </form>

      <div className="my-6 text-center text-sm text-gray-500">O continúa con</div>

      <div className="flex justify-center">
        <button
          onClick={handleGoogleLogin}
          className="border border-gray-300 rounded-full p-3 hover:bg-gray-100 transition"
        >
          <FcGoogle size={24} />
        </button>
      </div>
    </div>
  );
}