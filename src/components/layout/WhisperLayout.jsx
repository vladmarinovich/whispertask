import HomeMain from './tabs/HomeMain';
import AgendaTab from './tabs/AgendaTab';
import HistoryTab from './tabs/HistoryTab';
import SettingsTab from './tabs/SettingsTab';
import SummaryTab from './tabs/SummaryTab';
import TranscriptionTab from './tabs/TranscriptionTab';

export default function WhisperLayout({ activeTab }) {
  return (
    <div className="flex flex-col flex-1 h-full w-full overflow-hidden bg-white">
      {/* Aquí puedes dejar el padding general si quieres */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'home' && <HomeMain />}
        {activeTab === 'agenda' && <AgendaTab />}
        {activeTab === 'history' && <HistoryTab />}
        {activeTab === 'settings' && <SettingsTab />}
        {activeTab === 'summary' && <SummaryTab />}
        {activeTab === 'transcription' && <TranscriptionTab />}
      </div>
    </div>
  );
}