import React, { useState } from "react";
import Sidebar from "./Sidebar";
import HomeMain from "./HomeMain";
import AssistantPanel from "./AssistantPanel";

export default function WhisperLayout() {
  const [activeTab, setActiveTab] = useState("transcript"); // "transcript" | "summary"

  return (
    <div className="h-screen w-screen flex bg-gray-100">
      {/* Sidebar izquierda */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Contenido central */}
      <HomeMain activeTab={activeTab} />

      {/* Asistente IA */}
      <AssistantPanel />
    </div>
  );
}