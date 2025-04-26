// ✅ src/components/layout/Sidebar.jsx
import { Home, BookText, CalendarClock, CalendarDays, Settings } from "lucide-react";
import UserCard from "./sidebar/UserCard";
import logo from "../../assets/logo.svg";

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { name: "Inicio", icon: <Home size={18} />, value: "home" },
    { name: "Resumen IA", icon: <BookText size={18} />, value: "summary" },
    { name: "Historial", icon: <CalendarClock size={18} />, value: "history" },
    { name: "Agenda semanal", icon: <CalendarDays size={18} />, value: "agenda" },
    { name: "Ajustes", icon: <Settings size={18} />, value: "ajustes" },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col justify-between">
      <div className="py-6">
        <div className="flex items-center justify-start pl-6 mb-6">
          <img src={logo} alt="Whispertask Logo" className="w-32" />
        </div>
        <UserCard />
        <div className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setActiveTab(item.value)}
              className={`flex items-center gap-3 px-6 py-2 w-full text-left text-sm font-medium transition-colors focus:outline-none focus:ring-0 focus:border-0 ${
                activeTab === item.value ? "text-[#4A9FFF]" : "text-gray-700 hover:text-[#4A9FFF]"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}