'use server'
import { protectedFetch, serverMutation } from "../core/server";
import { PaginationMeta } from "./adminBookings";

export interface AdminUserRecord {
  _id: string;
  name: string;
  email: string;
  role: "patient" | "doctor" | "admin";
  createdAt: string;
}

interface FetchUsersQueryParams {
  page: number;
  limit: number;
  role: "All" | "patient" | "doctor" | "admin";
  search: string;
}

interface FetchUsersResponse {
  success: boolean;
  pagination: PaginationMeta;
  data: AdminUserRecord[];
}

interface RoleMutationResponse {
  success: boolean;
  message: string;
}

/**
 * Fetches paginated user records matching specified search parameters and role filters.
 */
export const getAdminUsersLedger = async ({
  page,
  limit,
  role,
  search,
}: FetchUsersQueryParams): Promise<FetchUsersResponse | null> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      role: role,
      ...(search ? { search } : {}),
    });

    const result = await protectedFetch<FetchUsersResponse>(
      `admin/users?${queryParams.toString()}`,
    );
    return result.success ? result : null;
  } catch (error) {
    console.error("Error fetching admin users index:", error);
    return null;
  }
};

/**
 * Modifies a user's role (Promote to admin / Demote to patient) using the serverMutation helper.
 * @param userId Unique target identifier of the user document.
 * @param targetRole Destination access layer ("admin" or "patient").
 */
export const updateUserRole = async (
  userId: string,
  targetRole: "admin" | "patient",
): Promise<boolean> => {
  try {
    const path = `admin/users/${userId}/role`;

    // Utilizing your serverMutation helper for the PATCH method payload execution
    const result = await serverMutation<RoleMutationResponse>(path, "PATCH", {
      targetRole,
    });

    return result.success;
  } catch (error) {
    console.error(
      `Error updating role for user ${userId} to ${targetRole}:`,
      error,
    );
    return false;
  }
};
