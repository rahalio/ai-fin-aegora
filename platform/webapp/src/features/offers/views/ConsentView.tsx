import { demoConsent } from "../../../lib/demo-data";
import { PurposeTagChip } from "../../../components/aegora-ui";

export function ConsentView() {
  return (
    <section className="panel help">
      <h1>Consent and legal basis</h1>
      <p>Query basis before offer delivery. Absence blocks help only.</p>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Purpose</th>
            <th>Basis</th>
          </tr>
        </thead>
        <tbody>
          {demoConsent.map((c) => (
            <tr key={c.consentRecordId}>
              <td className="mono">{c.customerId}</td>
              <td>
                <PurposeTagChip purpose={c.purpose as "help" | "protect"} />
              </td>
              <td>{c.basisPresent ? c.legalBasis : "missing — fail closed on help"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
