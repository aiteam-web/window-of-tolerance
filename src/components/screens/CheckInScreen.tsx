import type { ZoneType } from "../WindowApp";

interface Props {
  selected: ZoneType;
  onSelect: (zone: ZoneType) => void;
  onBack: () => void;
  onNext: () => void;
}

const zones = [
  {
    id: "hyper" as const,
    emoji: "🔴",
    label: "Above My Window",
    desc: "I feel anxious, panicked, angry, or overwhelmed.",
    borderColor: "hsl(var(--hyper))",
  },
  {
    id: "safe" as const,
    emoji: "🟢",
    label: "Inside My Window",
    desc: "I feel calm, present, and grounded.",
    borderColor: "hsl(var(--safe))",
  },
  {
    id: "hypo" as const,
    emoji: "🔵",
    label: "Below My Window",
    desc: "I feel numb, foggy, or disconnected.",
    borderColor: "hsl(var(--hypo))",
  },
];

export default function CheckInScreen({ selected, onSelect, onBack, onNext }: Props) {
  return (
    <section className="space-y-6" aria-label="Check-in">
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold text-foreground">Where Are You Right Now?</h2>
        <p className="text-sm text-muted-foreground">Take a breath. Then honestly select where you are right now.</p>
      </div>

      <div className="space-y-3">
        {zones.map((z) => (
          <button
            key={z.id}
            onClick={() => onSelect(z.id)}
            className="zone-card w-full text-left flex gap-4 items-start"
            style={{
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: selected === z.id ? "hsl(var(--safe))" : "hsl(var(--border))",
              background: selected === z.id ? "hsl(var(--safe) / 0.06)" : undefined,
            }}
            aria-pressed={selected === z.id}
          >
            <span className="text-2xl mt-0.5">{z.emoji}</span>
            <div>
              <p className="font-semibold text-foreground">{z.label}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{z.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3.5 rounded-2xl border border-border text-foreground font-medium hover:bg-muted transition-all duration-300 hover:-translate-y-0.5"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!selected}
          className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-medium transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          Next →
        </button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        There is no wrong answer. This is simply your starting point.
      </p>
    </section>
  );
}
