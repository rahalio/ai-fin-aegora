import { CrossPurposeRibbon, PurposeTagChip } from "../../../components/aegora-ui";
import { demoPolicies } from "../../../lib/demo-data";
import type { PoliciesViewProps } from "./types";

export function PoliciesView({}: PoliciesViewProps) {
  return (
    <section className="panel broker">
      <h1>Purpose broker</h1>
      <p>Cross-purpose reuse requires a signed rule and dual approval. Silent paths fail closed (BR-4).</p>
      {demoPolicies.map((p) => (
        <article key={p.policyId} className="card">
          <CrossPurposeRibbon text={`${p.fromPurpose} → ${p.toPurpose} · ${p.effect}`} />
          <h2>{p.name}</h2>
          <PurposeTagChip purpose={p.fromPurpose as "help" | "protect"} />
          <p>{p.feeIncentiveNote}</p>
          {p.silentReuseDetected ? <p className="fail-closed">Silent reuse scan: violation listed until dual-approved.</p> : null}
          <p>Approvals {p.approvalCount}/2</p>
          <button type="button">Approve</button>
          <button type="button">Disable</button>
        </article>
      ))}
    </section>
  );
}
