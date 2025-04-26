// ✅ src/components/layout/sidebar/SidebarMenu.jsx
import {
    Mic,
    FileText,
    Calendar,
    FolderOpen,
    Settings,
  } from "lucide-react";
  
  const navItems = [
    { id: "transcription", label: "Transcripciones", icon: <Mic size={18} /> },
    { id: "summary", label: "Resumen IA", icon: <FileText size={18} /> },
    { id: "agenda", label: "Agenda semanal", icon: <Calendar size={18} /> },
    { id: "history", label: "Historial", icon: <FolderOpen size={18} /> },
    { id: "settings", label: "Ajustes", icon: <Settings size={18} /> },
  ];
  
  export default function SidebarMenu({ activeTab, setActiveTab }) {
    return (
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-left text-sm ${
              activeTab === item.id
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    );
  }