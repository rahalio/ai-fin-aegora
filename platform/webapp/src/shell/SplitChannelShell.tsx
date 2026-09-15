import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { defaultHome, getRole, setRole, type OperatorRole } from "../lib/session";

const roles: { id: OperatorRole; label: string }[] = [
  { id: "pm", label: "Personalisation PM" },
  { id: "rm", label: "Relationship manager" },
  { id: "fraud", label: "Fraud analyst" },
  { id: "soc", label: "SOC analyst" },
  { id: "privacy", label: "Privacy / model risk" },
  { id: "care", label: "Customer care" },
];

export function SplitChannelShell() {
  const navigate = useNavigate();
  const role = getRole();

  return (
    <div className="shell">
      <aside className="spine">
        <div className="wordmark">Aegora</div>
        <p className="spine-sub">Help and protect on one ethical contract</p>
        <nav>
          <NavLink to="/help">Help</NavLink>
          <NavLink to="/rm">RM desk</NavLink>
          <NavLink to="/protect">Protect</NavLink>
          <NavLink to="/protect/holds">Holds</NavLink>
          <NavLink to="/protect/cases">Intrusion</NavLink>
          <NavLink to="/protect/disputes">Disputes</NavLink>
          <NavLink to="/broker">Purpose broker</NavLink>
          <NavLink to="/consent">Consent</NavLink>
          <NavLink to="/models">Models</NavLink>
          <NavLink to="/audits">Audits</NavLink>
        </nav>
        <label className="role-switch">
          Role
          <select
            defaultValue={role}
            onChange={(e) => {
              const next = e.target.value as OperatorRole;
              setRole(next);
              navigate(defaultHome(next));
            }}
          >
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </label>
      </aside>
      <main className="stage">
        <Outlet />
      </main>
    </div>
  );
}
