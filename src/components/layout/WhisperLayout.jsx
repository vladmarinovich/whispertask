// ✅ src/components/layout/WhisperLayout.jsx
import UploadAudio from "../UploadAudio";
import AudioRecorder from "../AudioRecorder";
import AudioList from "./AudioList";
import AssistantPanel from "./AssistantPanel";
import SummaryTab from "./tabs/SummaryTab";
import HistoryTab from "./tabs/HistoryTab";
import AgendaTab from "./tabs/AgendaTab";
import SettingsTab from "./tabs/SettingsTab";

console.log("🔎 UploadAudio:", typeof UploadAudio);
console.log("🔎 RecordAudio:", typeof RecordAudio);
console.log("🔎 AudioList:", typeof AudioList);
console.log("🔎 SummaryTab:", typeof SummaryTab);
console.log("🔎 HistoryTab:", typeof HistoryTab);
console.log("🔎 AgendaTab:", typeof AgendaTab);
console.log("🔎 SettingsTab:", typeof SettingsTab);

export default function WhisperLayout({ activeTab }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {activeTab === "home" ? (
          <div className="space-y-6">
            <UploadAudio />
            <RecordAudio />
            <AudioList />
          </div>
        ) : (
          <>
            {activeTab === "summary" && <SummaryTab />}
            {activeTab === "history" && <HistoryTab />}
            {activeTab === "agenda" && <AgendaTab />}
            {activeTab === "ajustes" && <SettingsTab />}
          </>
        )}
      </main>
      <AssistantPanel />
    </div>
  );
}
