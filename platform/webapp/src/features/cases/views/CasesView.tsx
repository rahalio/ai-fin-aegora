import { demoCases } from "../../../lib/demo-data";
import type { CasesViewProps } from "./types";

export function CasesView({}: CasesViewProps) {
  return (
    <section className="panel protect">
      <h1>Intrusion cases</h1>
      <p>Aggregated host timelines only. Raw packets stay out of help views (BR-10).</p>
      {demoCases.map((c) => (
        <article key={c.caseId} className="card ember">
          <header>
            {c.status} · {c.assignedTo}
          </header>
          <p>{c.summary}</p>
          <p className="mono">Hosts: {c.hostIds.join(", ")}</p>
          <button type="button">Assign</button>
          <button type="button">Close / SIEM ticket</button>
        </article>
      ))}
    </section>
  );
}
