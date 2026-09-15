import { Link } from "react-router-dom";
import { PdProbabilityMeter, PurposeTagChip } from "../../../components/aegora-ui";
import { demoOffers } from "../../../lib/demo-data";
import type { OffersViewProps } from "./types";

export function OffersView({}: OffersViewProps) {
  return (
    <section className="panel help">
      <h1>Help home</h1>
      <p>Ranked next-best actions with constraint flags. Help pauses without consent; protect continues.</p>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Offer</th>
            <th>Uptake</th>
            <th>Constraints</th>
            <th>Basis</th>
          </tr>
        </thead>
        <tbody>
          {demoOffers.map((o) => (
            <tr key={o.offerId}>
              <td className="mono">{o.customerId}</td>
              <td>
                <Link to={`/help/offers/${o.offerId}`}>{o.productCode}</Link>
              </td>
              <td>{Math.round(o.predictedUptake * 100)}%</td>
              <td>{o.constraintFlags.join(", ")}</td>
              <td>
                <PurposeTagChip purpose="help" basis={o.consentBasisPresent ? "present" : "missing"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function OfferDetailView({ offerId }: { offerId: string }) {
  const o = demoOffers.find((x) => x.offerId === offerId) ?? demoOffers[0];
  return (
    <section className="panel help">
      <h1>{o.productCode}</h1>
      <PurposeTagChip purpose="help" basis={o.consentBasisPresent ? "consent" : "none"} />
      {o.activeProtectHold ? <div className="banner-hold">Active protect hold — do not pitch into a blocked card.</div> : null}
      <p>{o.explanation}</p>
      <p>Content reuse: {o.contentObjectId}</p>
      <PdProbabilityMeter value={o.probabilityOfDefault} />
      {!o.consentBasisPresent ? (
        <p className="fail-closed">Missing legal basis: help is blocked. Protect is unchanged (BR-8).</p>
      ) : (
        <button type="button">Deliver</button>
      )}
    </section>
  );
}
