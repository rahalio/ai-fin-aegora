export function PurposeTagChip({
  purpose,
  basis,
}: {
  purpose: "help" | "protect";
  basis?: string;
}) {
  return (
    <span className={`chip chip-${purpose}`}>
      {purpose}
      {basis ? ` · ${basis}` : ""}
    </span>
  );
}

export function PdProbabilityMeter({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  return (
    <div className="pd-meter">
      <div className="pd-label">PD {pct}%</div>
      <div className="pd-track">
        <div className="pd-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="pd-note">Probability, not a credible/not badge.</div>
    </div>
  );
}

export function CrossPurposeRibbon({ text }: { text: string }) {
  return <div className="policy-ribbon">{text}</div>;
}

export function SlaClock({ deadline }: { deadline: string }) {
  const ms = new Date(deadline).getTime() - Date.now();
  const mins = Math.max(0, Math.round(ms / 60000));
  return <span className={mins < 5 ? "sla-hot" : "sla-ok"}>SLA {mins}m</span>;
}
