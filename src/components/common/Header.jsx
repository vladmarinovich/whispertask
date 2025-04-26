// ✅ src/components/common/Header.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import logo from "../../assets/logo.svg";
import { UserCircle, ChevronDown, LogOut, Settings } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-gray-200 relative z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="WhisperTask logo" className="h-[65px] w-auto" />
      </div>

      {/* Menú de cuenta */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
        >
          <UserCircle className="w-6 h-6" />
          <ChevronDown className="w-4 h-4" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1">
            <button
              onClick={() => {
                setOpen(false);
                alert("Función de configuración próximamente.");
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}