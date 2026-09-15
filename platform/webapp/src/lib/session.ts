export type OperatorRole = "pm" | "rm" | "fraud" | "soc" | "privacy" | "care";

const KEY = "aegora.role";

export function getRole(): OperatorRole {
  return (sessionStorage.getItem(KEY) as OperatorRole) || "pm";
}

export function setRole(role: OperatorRole): void {
  sessionStorage.setItem(KEY, role);
}

export function defaultHome(role: OperatorRole): string {
  switch (role) {
    case "rm":
      return "/rm";
    case "fraud":
      return "/protect";
    case "soc":
      return "/protect/cases";
    case "privacy":
      return "/broker";
    case "care":
      return "/protect/disputes";
    default:
      return "/help";
  }
}
