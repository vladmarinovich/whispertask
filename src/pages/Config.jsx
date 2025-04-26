// ✅ src/pages/Config.jsx
import MainLayout from "../components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Config() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Configuración - WhisperTask";
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col flex-1 items-center justify-center p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Configuración</h1>
        <p className="text-gray-500">Esta sección estará disponible muy pronto.</p>
        <button
          onClick={() => navigate("/home")}
          className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Volver al Dashboard
        </button>
      </div>
    </MainLayout>
  );
}