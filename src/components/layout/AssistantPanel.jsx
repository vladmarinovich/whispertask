import React from "react";

export default function AssistantPanel() {
  return (
    <aside className="w-80 bg-gray-50 border-l border-gray-300 p-4 flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Asistente IA</h3>

      <div className="space-y-3 text-sm text-gray-700">
        <button className="w-full bg-white border border-gray-300 rounded px-4 py-2 text-left hover:bg-gray-100">
          ¿Qué decisiones se tomaron?
        </button>
        <button className="w-full bg-white border border-gray-300 rounded px-4 py-2 text-left hover:bg-gray-100">
          ¿Qué tareas quedaron pendientes?
        </button>
        <button className="w-full bg-white border border-gray-300 rounded px-4 py-2 text-left hover:bg-gray-100">
          ¿Quién fue mencionado?
        </button>
      </div>

      <div className="mt-auto text-xs text-gray-400 text-center pt-6">
        (Próximamente: chat de IA 🔥)
      </div>
    </aside>
  );
}