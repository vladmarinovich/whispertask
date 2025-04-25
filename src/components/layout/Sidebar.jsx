import React from "react";

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-60 bg-white border-r border-gray-300 p-4">
      <h2 className="text-xl font-bold text-[#4A9FFF] mb-6">WhisperTask</h2>

      <nav className="space-y-2">
        <button
          onClick={() => setActiveTab("transcript")}
          className={`block w-full text-left px-4 py-2 rounded ${
            activeTab === "transcript"
              ? "bg-[#4A9FFF] text-white font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          📄 Transcripción
        </button>

        <button
          onClick={() => setActiveTab("summary")}
          className={`block w-full text-left px-4 py-2 rounded ${
            activeTab === "summary"
              ? "bg-[#4A9FFF] text-white font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          🧠 Resumen IA
        </button>
      </nav>
    </aside>
  );
}