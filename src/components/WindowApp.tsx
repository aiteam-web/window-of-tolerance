import { useState, useCallback } from "react";
import WelcomeScreen from "./screens/WelcomeScreen";
import ExplainScreen from "./screens/ExplainScreen";
import CheckInScreen from "./screens/CheckInScreen";
import ZoneScreen from "./screens/ZoneScreen";
import ToolkitScreen from "./screens/ToolkitScreen";
import HistoryModal from "./HistoryModal";
import NavigationDots from "./NavigationDots";
import ExitDialog from "./ExitDialog";

export type ZoneType = "hyper" | "safe" | "hypo" | null;

export interface CheckInEntry {
  zone: ZoneType;
  timestamp: Date;
}

const SCREEN_MAP: Record<number, number> = { 0: 0, 1: 1, 2: 2, 4: 3 };
const DOT_TO_SCREEN: Record<number, number> = { 0: 0, 1: 1, 2: 2, 3: 4 };

export default function WindowApp() {
  const [screen, setScreen] = useState(0);
  const [selectedZone, setSelectedZone] = useState<ZoneType>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [journal, setJournal] = useState("");
  const [history, setHistory] = useState<CheckInEntry[]>(() => {
    const saved = localStorage.getItem("wot-history");
    if (saved) return JSON.parse(saved).map((e: any) => ({ ...e, timestamp: new Date(e.timestamp) }));
    return [];
  });
  const [weekTracker, setWeekTracker] = useState<(ZoneType)[]>(() => {
    const saved = localStorage.getItem("wot-week");
    return saved ? JSON.parse(saved) : [null, null, null, null, null, null, null];
  });

  const navigate = useCallback((s: number) => {
    setScreen(s);
  }, []);

  const handleCheckIn = useCallback((zone: ZoneType) => {
    setSelectedZone(zone);
  }, []);

  const goToZoneScreen = useCallback(() => {
    if (!selectedZone) return;
    const entry: CheckInEntry = { zone: selectedZone, timestamp: new Date() };
    const newHistory = [entry, ...history].slice(0, 50);
    setHistory(newHistory);
    localStorage.setItem("wot-history", JSON.stringify(newHistory));
    const day = new Date().getDay();
    const adjustedDay = day === 0 ? 6 : day - 1;
    const newWeek = [...weekTracker];
    newWeek[adjustedDay] = selectedZone;
    setWeekTracker(newWeek);
    localStorage.setItem("wot-week", JSON.stringify(newWeek));
    setScreen(3);
  }, [selectedZone, history, weekTracker]);

  const handleSave = useCallback(() => {
    if (journal.trim()) {
      localStorage.setItem("wot-journal", journal);
    }
    setJournal("");
    setSelectedZone(null);
    setScreen(0);
  }, [journal]);

  const activeDot = screen <= 2 ? screen : screen === 3 ? 2 : 3;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[500px] mx-auto">
        <div className="fade-in" key={screen}>
          {screen === 0 && (
            <WelcomeScreen
              onBegin={() => navigate(1)}
              onHistory={() => setShowHistory(true)}
              onBack={() => setShowExit(true)}
            />
          )}
          {screen === 1 && (
            <ExplainScreen onBack={() => navigate(0)} onNext={() => navigate(2)} />
          )}
          {screen === 2 && (
            <CheckInScreen
              selected={selectedZone}
              onSelect={handleCheckIn}
              onBack={() => navigate(1)}
              onNext={goToZoneScreen}
            />
          )}
          {screen === 3 && (
            <ZoneScreen
              zone={selectedZone!}
              onContinue={() => navigate(4)}
              onBack={() => navigate(2)}
            />
          )}
          {screen === 4 && (
            <ToolkitScreen
              journal={journal}
              onJournalChange={setJournal}
              weekTracker={weekTracker}
              onSave={handleSave}
              onBack={() => navigate(3)}
            />
          )}
        </div>

        {screen !== 3 && (
          <NavigationDots
            active={activeDot}
            onNavigate={(dot) => {
              const target = DOT_TO_SCREEN[dot];
              if (target !== undefined) navigate(target);
            }}
          />
        )}
      </div>

      {showHistory && (
        <HistoryModal entries={history} onClose={() => setShowHistory(false)} />
      )}
      {showExit && (
        <ExitDialog onConfirm={() => setShowExit(false)} onCancel={() => setShowExit(false)} />
      )}
    </div>
  );
}

function generateSampleHistory(): CheckInEntry[] {
  const now = new Date();
  return [
    { zone: "safe", timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000) },
    { zone: "hyper", timestamp: new Date(now.getTime() - 26 * 60 * 60 * 1000) },
    { zone: "safe", timestamp: new Date(now.getTime() - 50 * 60 * 60 * 1000) },
    { zone: "hypo", timestamp: new Date(now.getTime() - 74 * 60 * 60 * 1000) },
    { zone: "safe", timestamp: new Date(now.getTime() - 98 * 60 * 60 * 1000) },
  ];
}
