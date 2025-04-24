import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [showVerifyMessage, setShowVerifyMessage] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      setShowVerifyMessage(true); // ✅ Mostrar mensaje de verificación
    } catch (err) {
      console.error(err);
      setError("No se pudo crear la cuenta. Intenta con otro correo.");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      console.error("Error con Google:", error);
      setError("No se pudo continuar con Google.");
    }
  };

  return (
    <div className="flex flex-col justify-center h-full">
      {showVerifyMessage ? (
        // ✅ Vista cuando se envía el correo de verificación
        <div className="text-center bg-white p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Verifica tu cuenta</h2>
          <p className="text-gray-600">
            Te hemos enviado un correo de verificación a <strong>{email}</strong>. <br />
            Revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.
          </p>
        </div>
      ) : (
        // ✅ Vista normal del formulario de registro
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Crea tu cuenta</h2>
          <p className="text-sm text-gray-600 mb-6">
            ¿Ya tienes una cuenta?{" "}
            <span className="text-[#4A9FFF] font-semibold cursor-pointer">Inicia sesión</span>
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-[#4A9FFF] focus:border-[#4A9FFF]"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-[#4A9FFF] focus:border-[#4A9FFF]"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-[#4A9FFF] focus:border-[#4A9FFF]"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <input
                type="password"
                id="confirm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-[#4A9FFF] focus:border-[#4A9FFF]"
                placeholder="••••••••"
                required
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#4A9FFF] hover:bg-[#326DFF] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Registrarme
            </button>
          </form>

          <div className="my-6 text-center text-sm text-gray-500">O continúa con</div>

          <div className="flex justify-center">
            <button
              onClick={handleGoogleRegister}
              className="border border-gray-300 rounded-full p-3 hover:bg-gray-100 transition"
            >
              <FcGoogle size={24} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}