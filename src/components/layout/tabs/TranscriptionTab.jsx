// ✅ src/components/layout/tabs/TranscriptionTab.jsx

export default function TranscriptionTab() {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Transcripciones</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-600">Aquí verás tus grabaciones y podrás subir nuevos audios.</p>
        </div>
      </div>
    );
  }