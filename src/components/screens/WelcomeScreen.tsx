import { ArrowLeft, ClipboardList } from "lucide-react";

interface Props {
  onBegin: () => void;
  onHistory: () => void;
  onBack: () => void;
}

export default function WelcomeScreen({ onBegin, onHistory, onBack }: Props) {
  return (
    <section className="space-y-6" aria-label="Welcome">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors" aria-label="Back">
          <ArrowLeft size={22} />
        </button>
        <button onClick={onHistory} className="p-2 -mr-2 rounded-full hover:bg-muted transition-colors" aria-label="View history">
          <ClipboardList size={22} />
        </button>
      </div>

      <div className="text-center space-y-3">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">Window of Tolerance</h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Understand your nervous system.<br />Find your way back to calm.
        </p>
      </div>

      <p className="text-foreground/80 text-sm leading-relaxed text-center">
        This gentle activity will help you understand where your nervous system is right now — and give you tools to find balance. Go at your own pace. You are safe here.
      </p>

      <div className="callout-box">
        <p className="text-sm font-medium text-foreground">✨ Take a breath. You're in the right place.</p>
      </div>

      <button
        onClick={onBegin}
        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
        style={{ minHeight: 48 }}
      >
        Let's Begin →
      </button>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        This activity is a supportive tool, not a replacement for professional therapy.
      </p>
    </section>
  );
}
