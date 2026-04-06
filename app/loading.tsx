export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="glass-card flex flex-col items-center gap-4 rounded-[28px] px-8 py-10 text-center">
        <div className="h-14 w-14 animate-pulse-glow rounded-full border border-gold/40 bg-primary/20" />
        <div>
          <p className="font-serif text-3xl text-copy">Loading Icon Bets</p>
          <p className="mt-2 text-sm uppercase tracking-[0.26em] text-muted">Preparing your VIP experience</p>
        </div>
      </div>
    </div>
  );
}
