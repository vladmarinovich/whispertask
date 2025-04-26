// ✅ src/components/layout/sidebar/SidebarGroup.jsx
import { useState } from "react";
import { ChevronDown, ChevronRight, Hash } from "lucide-react";

export default function SidebarGroup({ title, items }) {
  const [open, setOpen] = useState(true); // Estado para controlar si la sección está expandida

  return (
    <div className="px-3">
      {/* Botón para expandir/colapsar la sección */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-xs text-gray-500 uppercase tracking-wide mt-4 mb-2"
      >
        {/* Ícono de expansión */}
        <span className="flex items-center gap-1">
          {open ? (
            <ChevronDown className="w-3 h-3" />
          ) : (
            <ChevronRight className="w-3 h-3" />
          )}
          {title}
        </span>
      </button>

      {/* Mostrar los items si la sección está expandida */}
      {open && Array.isArray(items) && (
        <ul className="space-y-1 text-sm">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100"
            >
              <Hash className="w-4 h-4" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}