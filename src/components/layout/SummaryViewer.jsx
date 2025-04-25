import React from "react";

export default function SummaryViewer() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Resumen generado por IA</h3>
      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
        <li>Se discutieron los avances del módulo de autenticación.</li>
        <li>Se acordó una revisión de código para el jueves.</li>
        <li>María y Carlos asumirán las tareas prioritarias de esta semana.</li>
        <li>Próxima reunión: martes a las 10:00 a.m.</li>
      </ul>
    </div>
  );
}