// src/components/layout/sidebar/SidebarMenu.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function SidebarMenu() {
  const [activeTab, setActiveTab] = useState("Inicio");
  const navigate = useNavigate();

  const handleTabClick = (tabName, path) => {
    setActiveTab(tabName);
    navigate(path); // Cambia la ruta correspondiente
  };

  return (
    <div className="flex flex-col p-4 space-y-4">
      <button
        onClick={() => handleTabClick("Inicio", "/home")}
        className={`text-left ${activeTab === "Inicio" ? "font-semibold text-blue-600" : "text-gray-700"}`}
      >
        Inicio
      </button>
      <button
        onClick={() => handleTabClick("Resumen IA", "/summary")}
        className={`text-left ${activeTab === "Resumen IA" ? "font-semibold text-blue-600" : "text-gray-700"}`}
      >
        Resumen IA
      </button>
      <button
        onClick={() => handleTabClick("Historial", "/history")}
        className={`text-left ${activeTab === "Historial" ? "font-semibold text-blue-600" : "text-gray-700"}`}
      >
        Historial
      </button>
      <button
        onClick={() => handleTabClick("Agenda", "/agenda-semanal")}
        className={`text-left ${activeTab === "Agenda" ? "font-semibold text-blue-600" : "text-gray-700"}`}
      >
        Agenda Semanal
      </button>
      <button
        onClick={() => handleTabClick("Ajustes", "/config")}
        className={`text-left ${activeTab === "Ajustes" ? "font-semibold text-blue-600" : "text-gray-700"}`}
      >
        Ajustes
      </button>
    </div>
  );
}