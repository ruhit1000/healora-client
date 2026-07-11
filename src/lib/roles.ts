export const APP_ROLES = ["patient", "doctor", "admin"] as const;

export type AppRole = (typeof APP_ROLES)[number];

export function normalizeRole(value: unknown): AppRole {
  if (typeof value !== "string") {
    return "patient";
  }

  if (value === "doctor" || value === "admin" || value === "patient") {
    return value;
  }

  return "patient";
}

export function dashboardPathForRole(role: AppRole): string {
  switch (role) {
    case "doctor":
      return "/dashboard/doctor";
    case "admin":
      return "/dashboard/admin";
    case "patient":
    default:
      return "/dashboard/patient";
  }
}
