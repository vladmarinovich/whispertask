import { Route, Routes } from 'react-router-dom';
import AgendaTab from './tabs/AgendaTab';
import HistoryTab from './tabs/HistoryTab';
import SettingsTab from './tabs/SettingsTab';
import SummaryTab from './tabs/SummaryTab';
import TranscriptionTab from './tabs/TranscriptionTab';

export default function WhisperLayout() {
  return (
    <div className="whisper-layout">
      {/* Aquí va el sidebar que ya tienes */}

      {/* Div que cambia según el tab */}
      <main className="flex-1">
        <Routes>
          <Route path="/agenda" element={<AgendaTab />} />
          <Route path="/history" element={<HistoryTab />} />
          <Route path="/settings" element={<SettingsTab />} />
          <Route path="/summary" element={<SummaryTab />} />
          <Route path="/transcription" element={<TranscriptionTab />} />
        </Routes>
      </main>
    </div>
  );
}