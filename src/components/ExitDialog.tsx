interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ExitDialog({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
      <div
        className="relative bg-card rounded-3xl p-6 w-full max-w-[360px] text-center fade-in"
        style={{ boxShadow: "var(--shadow-lift)" }}
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-label="Exit confirmation"
      >
        <h2 className="font-display text-lg font-semibold text-foreground mb-2">Are you sure you want to exit?</h2>
        <p className="text-sm text-muted-foreground mb-6">Your unsaved data will be lost.</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-all duration-300"
          >
            Stay
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-destructive text-destructive-foreground font-medium hover:opacity-90 transition-all duration-300"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
