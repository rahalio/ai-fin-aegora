import { Link } from "react-router-dom";
import { SlaClock } from "../../../components/aegora-ui";
import { demoAlerts } from "../../../lib/demo-data";
import type { AlertsViewProps } from "./types";

export function AlertsView({}: AlertsViewProps) {
  return (
    <section className="panel protect">
      <h1>Protect home — geo alerts</h1>
      <p>Investigator packs: cluster, convex hull, prior venues. Latency SLA (BR-3).</p>
      {demoAlerts.map((a) => (
        <article key={a.alertId} className="card ember">
          <header>
            {a.alertType} · {a.severity} <SlaClock deadline={a.slaDeadlineAt} />
          </header>
          <p>Customer {a.customerId}</p>
          <p>Hull venues: {a.priorVenues.join(" → ")}</p>
          <div className="map-stub">Geo hull map (cluster + convex hull)</div>
          <Link to="/protect/holds">Place / confirm hold</Link>
        </article>
      ))}
    </section>
  );
}
