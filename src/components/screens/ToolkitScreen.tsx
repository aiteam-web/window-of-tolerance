import type { ZoneType } from "../WindowApp";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const ZONE_EMOJI: Record<string, string> = { hyper: "🔴", safe: "🟢", hypo: "🔵" };

interface Props {
  journal: string;
  onJournalChange: (v: string) => void;
  weekTracker: (ZoneType)[];
  onSave: () => void;
  onBack: () => void;
}

export default function ToolkitScreen({ journal, onJournalChange, weekTracker, onSave, onBack }: Props) {
  return (
    <section className="space-y-6" aria-label="Your Personal Toolkit">
      <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors" aria-label="Back">
        ← Back
      </button>

      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold text-foreground">🧰 Your Personal Toolkit</h2>
        <p className="text-sm text-muted-foreground">Your go-to tools — saved and ready whenever you need them.</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {["🌬️ Box Breathing", "🖐️ 5-4-3-2-1", "🦶 Feet on Floor", "🚶 Gentle Movement", "🎵 Music", "💬 Speak Out Loud"].map((t) => (
          <span key={t} className="pill-tag text-xs font-medium">{t}</span>
        ))}
      </div>

      {/* Journal */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">📝 Today's Reflection</label>
        <p className="text-xs text-muted-foreground">
          What was one moment today when you noticed your nervous system shifting — and what did you do about it?
        </p>
        <textarea
          value={journal}
          onChange={(e) => onJournalChange(e.target.value)}
          placeholder="Write here..."
          className="w-full min-h-[80px] p-4 rounded-xl border border-border bg-card text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
        />
      </div>

      {/* Weekly Tracker */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">📊 Your Week at a Glance</label>
        <div className="flex justify-between px-2">
          {DAYS.map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-1.5" title={day}>
              <span className="text-lg">{weekTracker[i] ? ZONE_EMOJI[weekTracker[i]!] : "⚪"}</span>
              <span className="text-[10px] text-muted-foreground font-medium">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onSave}
        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
      >
        Save & Finish ✓
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Your journey matters. Come back whenever you need support.
      </p>
    </section>
  );
}
