// ✅ src/components/layout/sidebar/UserCard.jsx
import { useState } from "react";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../../firebase";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserCard() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const avatar = user?.photoURL || "https://cdn-icons-png.flaticon.com/512/9131/9131529.png";
  const name = user?.displayName || "Usuario invitado";
  const email = user?.email || "correo@ejemplo.com";

  const handleLogout = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("❌ Error cerrando sesión:", error);
    }
  };

  const isConfig = location.pathname === "/config";

  return (
    <div className="border rounded-xl mx-3 mt-4 overflow-hidden shadow-sm bg-white">
      {/* Área de usuario */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <img src={avatar} alt="Avatar" className="w-9 h-9 rounded-full object-cover" />
          <div className="truncate">
            <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
            <p className="text-xs text-gray-400 truncate">{email}</p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transform ${open ? "rotate-180" : ""}`} />
      </div>

      {/* Sección expandida */}
      {open && (
        <div className="border-t">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(isConfig ? "/home" : "/config");
            }}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 w-full px-4 py-2"
          >
            <Settings className="w-4 h-4" />
            {isConfig ? "Dashboard" : "Configuración"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 w-full px-4 py-2"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
