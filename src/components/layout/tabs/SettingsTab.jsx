// ✅ src/components/layout/tabs/SettingsTab.jsx

export default function SettingsTab() {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Configuración</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
          <p className="text-gray-600">Aquí podrás ajustar las preferencias de tu cuenta, integraciones y notificaciones.</p>
          <ul className="list-disc pl-5 text-gray-500 text-sm">
            <li>Preferencias de idioma</li>
            <li>Conexiones con Google Calendar y Monday</li>
            <li>Privacidad y notificaciones</li>
          </ul>
        </div>
      </div>
    );
  }