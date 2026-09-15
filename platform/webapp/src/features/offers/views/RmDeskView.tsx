import { PurposeTagChip } from "../../../components/aegora-ui";
import { demoOffers } from "../../../lib/demo-data";

export function RmDeskView() {
  const pending = demoOffers.filter((o) => o.status !== "blocked");
  return (
    <section className="panel help">
      <h1>RM override desk</h1>
      <p>Relationship context survives the model. Overrides are counted in KPIs (BR-9).</p>
      {pending.map((o) => (
        <article key={o.offerId} className="card">
          <header>
            {o.customerId} · {o.productCode}
            <PurposeTagChip purpose="help" />
          </header>
          {o.activeProtectHold ? <div className="banner-hold">Pitch discouraged — protect hold active.</div> : null}
          <p>{o.explanation}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <select name="action" defaultValue="soften">
              <option value="veto">Veto</option>
              <option value="soften">Soften</option>
              <option value="defer">Defer</option>
            </select>
            <input name="reason" placeholder="Reason code" required />
            <button type="submit">Record override</button>
          </form>
        </article>
      ))}
    </section>
  );
}
