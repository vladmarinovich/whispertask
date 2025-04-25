import React from "react";
import UploadAudio from "../UploadAudio";
import AudioRecorder from "../AudioRecorder";
import AudioList from "./AudioList";
import TranscriptViewer from "./TranscriptViewer";
import SummaryViewer from "./SummaryViewer";

export default function HomeMain({ activeTab }) {
  return (
    <main className="flex-1 bg-white p-6 overflow-y-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {activeTab === "transcript" ? "Transcripción" : "Resumen"}
      </h2>

      {activeTab === "transcript" ? (
        <>
          <UploadAudio />
          <AudioRecorder />
          <AudioList />
          <TranscriptViewer />
        </>
      ) : (
        <SummaryViewer />
      )}
    </main>
  );
}