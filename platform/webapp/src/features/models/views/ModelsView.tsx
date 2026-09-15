import { PurposeTagChip } from "../../../components/aegora-ui";
import { demoModels } from "../../../lib/demo-data";
import type { ModelsViewProps } from "./types";

export function ModelsView({}: ModelsViewProps) {
  return (
    <section className="panel broker">
      <h1>Model lineage</h1>
      <p>Promote is blocked when lineage is incomplete (BR-7).</p>
      <div className="split-cols">
        {demoModels.map((m) => (
          <article key={m.modelId} className="card">
            <PurposeTagChip purpose={m.channel as "help" | "protect"} />
            <h2>{m.name}</h2>
            <p>{m.status}</p>
            <p className="mono">{m.lineage}</p>
            <button type="button" disabled={!m.lineageComplete}>
              Promote
            </button>
            <button type="button">Rollback</button>
          </article>
        ))}
      </div>
    </section>
  );
}
