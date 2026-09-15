import { useNavigate } from "react-router-dom";
import { defaultHome, setRole, type OperatorRole } from "../lib/session";

export function LoginView() {
  const navigate = useNavigate();
  return (
    <section className="login">
      <div className="wordmark">Aegora</div>
      <p>Twin-mandate relationship desk</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const role = String(form.get("role")) as OperatorRole;
          setRole(role);
          navigate(defaultHome(role));
        }}
      >
        <label>
          Operator email
          <input name="email" defaultValue="admin@demo.local" />
        </label>
        <label>
          Role
          <select name="role" defaultValue="pm">
            <option value="pm">Personalisation PM</option>
            <option value="rm">Relationship manager</option>
            <option value="fraud">Fraud analyst</option>
            <option value="soc">SOC analyst</option>
            <option value="privacy">Privacy / model risk</option>
            <option value="care">Customer care</option>
          </select>
        </label>
        <button type="submit">Enter desk</button>
      </form>
    </section>
  );
}
