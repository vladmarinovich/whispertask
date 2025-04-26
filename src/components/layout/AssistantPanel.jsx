import React from "react";
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'; // Solid version


export default function AssistantPanel() {
  return (
    <aside className="w-80 bg-white flex flex-col h-full"> {/* ❌ Eliminado el border-l */}
      
      {/* Título del panel */}
      <h3 className="text-lg font-semibold text-gray-800 px-4 pt-4 pb-0">Asistente IA</h3>

      {/* Etiqueta Asistente IA */}
      <div className="px-4 pt-2 pb-4 text-blue-600 font-semibold text-sm">
        Asistente IA
      </div>

      {/* Área de contenido */}
      <div className="flex-grow overflow-y-auto px-4 space-y-4 text-sm text-gray-700">
        <p className="text-gray-800 font-semibold">
          Hazle cualquier pregunta sobre esta conversación o chatea con tus compañeros.
        </p>

        {/* Botones de sugerencia */}
        <button className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-100 flex items-center text-sm">
          <span>¿Qué decisiones se tomaron?</span>
        </button>
        <button className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-100 flex items-center text-sm">
          <span>¿Se me mencionó en esta reunión?</span>
        </button>
        <button className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-100 flex items-center text-sm">
          <span>¿Cuáles fueron las preguntas y respuestas de esta reunión?</span>
        </button>
      </div>

      {/* Área de entrada de mensaje */}
      <div className="p-4 border-t border-gray-300 flex-shrink-0 bg-white">
  <div className="relative flex items-center">
    {/* Botón de micrófono (izquierda) */}
    <button
      type="button"
      className="absolute left-2 flex items-center justify-center w-9 h-9 text-[#4A9FFF] rounded-full hover:bg-gray-100 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 1v11m0 0c2.21 0 4-1.79 4-4V5c0-2.21-1.79-4-4-4S8 2.79 8 5v3c0 2.21 1.79 4 4 4zm0 0v3m-4 4h8"
        />
      </svg>
    </button>

    {/* Área de texto */}
    <textarea
      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-full text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Escribe tu mensaje aquí..."
      rows="1"
      style={{
        minHeight: "2.75rem",
        maxHeight: "6rem",
        overflowY: "auto",
      }}
    ></textarea>

    {/* Botón de enviar (derecha) */}
    <button
      type="submit"
      className="absolute right-2 flex items-center justify-center w-9 h-9 bg-white border border-gray-300 text-[#4A9FFF] rounded-full hover:bg-gray-100 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </div>
</div>
    </aside>
  );
}