import { Link } from "react-router-dom";
import { demoHolds } from "../../../lib/demo-data";
import type { HoldsViewProps } from "./types";

export function HoldsView({}: HoldsViewProps) {
  return (
    <section className="panel protect">
      <h1>Provisional holds</h1>
      <p>Cap loss, measure false positives, time-box disputes (BR-6).</p>
      {demoHolds.map((h) => (
        <article key={h.holdId} className="card ember">
          <header>
            {h.status} · {h.customerId}
          </header>
          <p>{h.customerSafeRationale}</p>
          <p className="mono">Window ends {h.disputeWindowEndsAt}</p>
          <button type="button">Confirm</button>
          <button type="button">Release</button>
          <Link to="/protect/disputes">Open care dispute</Link>
        </article>
      ))}
    </section>
  );
}

export function DisputesView() {
  const h = demoHolds[0];
  return (
    <section className="panel protect">
      <h1>Care dispute desk</h1>
      <p>Restore service without defeating fraud controls.</p>
      <article className="card ember">
        <p>{h.customerSafeRationale}</p>
        <p>Clock: {h.disputeWindowEndsAt}</p>
        <button type="button">Resolve — restore</button>
        <button type="button">Escalate to fraud</button>
      </article>
    </section>
  );
}
