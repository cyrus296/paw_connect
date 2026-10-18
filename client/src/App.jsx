import { useState } from "react";
import AIAssistant from "./components/AIAssistant";
import AlertsManager from "./components/AlertsManager";
import FloatingAIBot from "./components/FloatingAIBot";
import LocateMyPet from "./components/LocateMyPet";
import Marketplace from "./components/Marketplace";
import MyPets from "./components/MyPets";
import PetAdoption from "./components/PetAdoption";
import PetBoarding from "./components/PetBoarding";
import PetCommunity from "./components/PetCommunity";
import PetEssentials from "./components/PetEssentials";
import PetHealth from "./components/PetHealth";
import PetMate from "./components/PetMate";
import PetTracking from "./components/PetTracking";
import PetVet from "./components/PetVet";
import Sidebar from "./components/Sidebar";
import VideoAcademy from "./components/VideoAcademy";
import Vittatc from "./components/Vittatc";

const pages = {
  dashboard: Vittatc,
  pets: MyPets,
  health: PetHealth,
  alerts: AlertsManager,
  vet: PetVet,
  boarding: PetBoarding,
  videos: VideoAcademy,
  ai: AIAssistant,
  tracking: PetTracking,
  locate: LocateMyPet,
  essentials: PetEssentials,
  marketplace: Marketplace,
  community: PetCommunity,
  mate: PetMate,
  adoption: PetAdoption,
};

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const PageComponent = pages[activePage];

  return (
    <div className="flex min-h-screen">
      <Sidebar active={activePage} onNavigate={setActivePage} />

      {PageComponent ? (
        <PageComponent onNavigate={setActivePage} />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400 text-lg">
          <p>
            <span className="text-2xl block mb-2">🚧</span>
            {activePage.charAt(0).toUpperCase() + activePage.slice(1)} page
            coming soon
          </p>
        </div>
      )}

      {/* Floating 24/7 AI Pet Assistant */}
      <FloatingAIBot onNavigate={setActivePage} />
    </div>
  );
}
