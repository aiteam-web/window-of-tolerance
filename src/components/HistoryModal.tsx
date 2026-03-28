import { X } from "lucide-react";
import type { CheckInEntry } from "./WindowApp";

const ZONE_LABELS: Record<string, { emoji: string; label: string }> = {
  hyper: { emoji: "🔴", label: "Above Window" },
  safe: { emoji: "🟢", label: "Inside Window" },
  hypo: { emoji: "🔵", label: "Below Window" },
};

function formatTime(d: Date) {
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const hours = diff / (1000 * 60 * 60);
  const timeStr = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (hours < 24) return `Today at ${timeStr}`;
  if (hours < 48) return `Yesterday at ${timeStr}`;
  return `${d.toLocaleDateString([], { month: "short", day: "numeric" })} at ${timeStr}`;
}

interface Props {
  entries: CheckInEntry[];
  onClose: () => void;
}

export default function HistoryModal({ entries, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
      <div
        className="relative bg-card rounded-3xl p-6 w-full max-w-[440px] max-h-[80vh] overflow-y-auto fade-in"
        style={{ boxShadow: "var(--shadow-lift)" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Check-in history"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-semibold text-foreground">📋 Check-In History</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        {entries.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No check-ins yet.</p>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, i) => {
              const zone = ZONE_LABELS[entry.zone!];
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <span className="text-lg">{zone.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{zone.label}</p>
                    <p className="text-xs text-muted-foreground">{formatTime(new Date(entry.timestamp))}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
