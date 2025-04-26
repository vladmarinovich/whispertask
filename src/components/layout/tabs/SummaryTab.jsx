// ✅ src/components/layout/tabs/SummaryTab.jsx

export default function SummaryTab() {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen IA</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-600">Aquí verás los resúmenes automáticos generados por la inteligencia artificial sobre tus reuniones.</p>
        </div>
      </div>
    );
  }