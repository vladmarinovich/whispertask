// ✅ src/components/layout/MainLayout.jsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import WhisperLayout from "./WhisperLayout";

export default function MainLayout() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-hidden">
        <WhisperLayout activeTab={activeTab} />
      </div>
    </div>
  );
}
