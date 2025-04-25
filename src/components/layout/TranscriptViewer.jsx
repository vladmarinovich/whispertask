import React from "react";

export default function TranscriptViewer() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Transcripción</h3>
      <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
        [Simulación de transcripción]  
        {"\n\n"}Hola a todos, gracias por asistir a la reunión de hoy. Vamos a revisar los avances del proyecto, establecer las prioridades para esta semana y definir quién se encargará de cada tarea...

        {"\n\n"}Carlos mencionó que el módulo de autenticación ya está casi listo. María propuso que hagamos una revisión conjunta del código el jueves.
      </div>
    </div>
  );
}