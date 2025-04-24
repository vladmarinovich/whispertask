// src/pages/Login.jsx
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error en login con Google:", error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Desde hoy la forma en que trabajas cambiará para siempre
      </h1>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
}

export default Login;