import { useState } from "react";

export default function AudioRecorder() {
  const [grabando, setGrabando] = useState(false);

  const toggleGrabar = () => {
    setGrabando(!grabando);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col gap-4">

      {/* Título FUERA de la caja */}
      <h3 className="text-xl font-semibold text-gray-800">
        Grabar audio desde el navegador
      </h3>

      {/* Caja de grabación */}
      <div className="flex flex-col items-start gap-6 border-2 border-dashed border-gray-300 rounded-lg p-6 w-full">

        {/* Estado de micrófono y webcam */}
        <div className="flex flex-col gap-4 w-full">
          {/* Micrófono activo */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#4A9FFF] rounded-full"></div>
            <span className="text-gray-700 text-sm">Micrófono activado</span>
          </div>

          {/* Webcam no utilizada */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <span className="text-gray-500 text-sm">Webcam no utilizada</span>
          </div>
        </div>

        {/* Botón de grabar */}
        <button
          onClick={toggleGrabar}
          className={`w-full bg-[#4A9FFF] hover:bg-[#3787E0] text-white font-semibold py-3 rounded-full text-lg transition-colors ${
            grabando ? "animate-pulse" : ""
          }`}
        >
          {grabando ? "Detener Grabación" : "Comenzar Grabación"}
        </button>

        {/* Nota al pie */}
        <p className="text-xs text-gray-400 text-center w-full">
          * Se solicitarán permisos para acceder al micrófono.
        </p>

      </div>
    </div>
  );
}