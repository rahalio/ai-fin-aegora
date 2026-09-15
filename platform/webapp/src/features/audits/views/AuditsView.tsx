import { demoAudits } from "../../../lib/demo-data";
import type { AuditsViewProps } from "./types";

export function AuditsView({}: AuditsViewProps) {
  return (
    <section className="panel broker">
      <h1>Period purpose audit</h1>
      <p>Actions, purpose, legal basis, and human overrides (BR-11).</p>
      {demoAudits.map((a) => (
        <article key={a.auditId} className="card">
          <p>
            {a.periodFrom} → {a.periodTo}
          </p>
          <p>Incomplete purpose tags: {a.incompletePurposeTags}</p>
          <p className="mono">{a.integrityHash}</p>
          <button type="button">Download export</button>
        </article>
      ))}
    </section>
  );
}
