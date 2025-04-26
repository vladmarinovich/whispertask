// ✅ src/components/layout/tabs/AgendaTab.jsx
export default function AgendaTab() {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Agenda semanal</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-600">Aquí verás las reuniones, tareas y eventos agendados para esta semana.</p>
        </div>
      </div>
    );
  }