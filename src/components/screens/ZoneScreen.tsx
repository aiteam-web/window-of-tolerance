import type { ZoneType } from "../WindowApp";

interface Props {
  zone: ZoneType;
  onContinue: () => void;
  onBack: () => void;
}

const ZONE_DATA = {
  hyper: {
    emoji: "🔴",
    title: "Above Your Window",
    color: "hsl(var(--hyper))",
    subtitle: "Your nervous system is in overdrive. That is okay. Let's bring you back gently.",
    feelings: ["Racing heart", "Shallow breathing", "Panic or anger", "Racing thoughts", "Restlessness"],
    tools: [
      { icon: "🌬️", name: "Box Breathing", desc: "Inhale 4, hold 4, exhale 4, hold 4. Repeat 4 times." },
      { icon: "🖐️", name: "5-4-3-2-1 Grounding", desc: "5 things see, 4 touch, 3 hear, 2 smell, 1 taste." },
      { icon: "🦶", name: "Feet on Floor", desc: "Press feet down, say: 'I am here. I am safe. This will pass.'" },
    ],
    continueText: "I Feel a Little Calmer →",
    footer: "You are safe. Take your time.",
  },
  hypo: {
    emoji: "🔵",
    title: "Below Your Window",
    color: "hsl(var(--hypo))",
    subtitle: "Your nervous system has gone quiet. It's protecting you. Let's gently wake it back up.",
    feelings: ["Numbness", "Disconnection", "Extreme fatigue", "Feeling unreal", "Flatness"],
    tools: [
      { icon: "🚶", name: "Gentle Movement", desc: "Stand, walk slowly, swing arms. Let your body wake up." },
      { icon: "🎵", name: "Rhythmic Sound", desc: "Play music with steady beat, tap feet along." },
      { icon: "💬", name: "Speak Out Loud", desc: "Say your name, location, today's date aloud. Re-engage thinking brain." },
    ],
    continueText: "I Feel a Little More Present →",
    footer: "You are doing great. Take it step by step.",
  },
  safe: {
    emoji: "🟢",
    title: "Inside Your Window",
    color: "hsl(var(--safe))",
    subtitle: "You are in your safe zone. This is where healing, connection, and growth happen. Well done.",
    feelings: ["Present & aware", "Steady breathing", "Clear thinking", "Connected"],
    tools: [
      { icon: "🧘", name: "Keep Breathing Slowly", desc: "In through nose, out through mouth." },
      { icon: "📝", name: "Reflect", desc: "What helped you stay here? Write it down." },
      { icon: "💛", name: "Self-Compassion", desc: "'My nervous system was doing its job. I'm not broken. I'm healing.'" },
    ],
    continueText: "Continue to My Toolkit →",
    footer: "You are worthy of care and healing.",
  },
};

export default function ZoneScreen({ zone, onContinue, onBack }: Props) {
  if (!zone) return null;
  const data = ZONE_DATA[zone];

  return (
    <section className="space-y-6" aria-label={data.title}>
      <button
        onClick={onBack}
        className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        aria-label="Back"
      >
        ← Back
      </button>

      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-bold" style={{ color: data.color }}>
          {data.emoji} {data.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{data.subtitle}</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {data.feelings.map((f) => (
          <span key={f} className="pill-tag text-xs">{f}</span>
        ))}
      </div>

      <div className="space-y-3">
        {data.tools.map((tool) => (
          <div key={tool.name} className="tool-card">
            <div className="flex gap-3 items-start">
              <span className="text-xl mt-0.5">{tool.icon}</span>
              <div>
                <p className="font-semibold text-sm text-foreground">{tool.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{tool.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <button
          onClick={onContinue}
          className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
        >
          {data.continueText}
        </button>
      </div>

      <p className="text-xs text-muted-foreground text-center">{data.footer}</p>
    </section>
  );
}
