import UploadAudio from "../../UploadAudio";
import AudioRecorder from "../../AudioRecorder";
import AudioList from "../AudioList";
import TranscriptViewer from "../TranscriptViewer";
import SummaryViewer from "../SummaryViewer";
import AssistantPanel from "../AssistantPanel";

export default function HomeMain({ activeTab }) {
  return (
    <div className="flex h-full w-full overflow-hidden">
      
      {/* Parte izquierda: Resumen o Transcripción */}
      <div className="flex flex-col flex-grow h-full overflow-y-auto p-6 bg-white">
        
        {/* Título: siempre mostrar Transcripción o Resumen */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {activeTab === "transcript" ? "Transcripción" : "Resumen"}
        </h2>

        {/* Flujo principal */}
        <div className="space-y-6">
          
          {/* SIEMPRE mostrar estos 4 componentes */}
          <UploadAudio />
          <AudioRecorder />
          <AudioList />
          <TranscriptViewer />

          {/* Y además, si NO estamos en "transcript", mostrar también SummaryViewer */}
          {activeTab !== "transcript" && (
            <SummaryViewer />
          )}

        </div>

      </div>

      {/* Parte derecha: Asistente IA (sin cambios) */}
      <div className="flex flex-col w-[400px] max-w-[400px] h-full bg-white shadow-md">
  <div className="flex-1 overflow-y-auto p-6">
    <AssistantPanel />
  </div>
</div>

    </div>
  );
}