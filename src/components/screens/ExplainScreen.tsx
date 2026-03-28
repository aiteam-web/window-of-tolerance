interface Props {
  onBack: () => void;
  onNext: () => void;
}

export default function ExplainScreen({ onBack, onNext }: Props) {
  return (
    <section className="space-y-6" aria-label="What is the Window of Tolerance">
      <h2 className="font-display text-2xl font-bold text-foreground text-center">Your Nervous System Has a Window</h2>

      {/* Window Diagram */}
      <div className="flex justify-center">
        <div className="w-[120px] rounded-2xl overflow-hidden border border-border" style={{ boxShadow: "var(--shadow-soft)" }}>
          <div className="h-[80px] flex items-center justify-center text-sm font-medium" style={{ background: "linear-gradient(180deg, hsl(0 55% 66%), hsl(0 55% 72%))", color: "white" }}>
            🔴 Red
          </div>
          <div className="h-[80px] flex items-center justify-center text-sm font-medium" style={{ background: "linear-gradient(180deg, hsl(150 20% 48%), hsl(150 20% 55%))", color: "white" }}>
            🟢 Green
          </div>
          <div className="h-[80px] flex items-center justify-center text-sm font-medium" style={{ background: "linear-gradient(180deg, hsl(207 35% 58%), hsl(207 35% 65%))", color: "white" }}>
            🔵 Blue
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3 items-start">
          <span className="text-lg mt-0.5">🔴</span>
          <div>
            <p className="font-semibold text-sm text-foreground">Hyperarousal</p>
            <p className="text-sm text-muted-foreground">Overwhelmed, panicked, out of control.</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <span className="text-lg mt-0.5">🟢</span>
          <div>
            <p className="font-semibold text-sm text-foreground">Safe Zone</p>
            <p className="text-sm text-muted-foreground">Calm, present, able to think clearly.</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <span className="text-lg mt-0.5">🔵</span>
          <div>
            <p className="font-semibold text-sm text-foreground">Hypoarousal</p>
            <p className="text-sm text-muted-foreground">Numb, disconnected, foggy.</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-foreground/80 leading-relaxed text-center">
        Trauma can push you out of your window. This helps you recognize where you are and get back inside.
      </p>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3.5 rounded-2xl border border-border text-foreground font-medium hover:bg-muted transition-all duration-300 hover:-translate-y-0.5"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
        >
          Next →
        </button>
      </div>
    </section>
  );
}
