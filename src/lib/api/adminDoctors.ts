'use server'
import { protectedFetch, serverMutation } from "../core/server";


export interface DoctorProfile {
  _id: string;
  name: string;
  email: string;
  specialty: string;
  fee: number;
  isApproved: boolean;
  status?: "Approved" | "Rejected" | "Suspended" | string;
  createdAt: string;
  bmdcNumber?: string;
  experienceYears?: number;
}

interface FetchDoctorsResponse {
  success: boolean;
  data: DoctorProfile[];
}

interface ActionResponse {
  success: boolean;
  message: string;
}

/**
 * Fetches all registered doctors (both active and pending verification) for administration.
 */
export const getAllDoctorsForAdmin = async (): Promise<DoctorProfile[]> => {
  try {
    const result = await protectedFetch<FetchDoctorsResponse>("admin/doctors");
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching admin doctors list:", error);
    return [];
  }
};

export const updateDoctorStatus = async (
  doctorId: string,
  action: "approve" | "reject" | "suspend"
): Promise<boolean> => {
  try {
    const path = `admin/doctors/${doctorId}/status`;

    const result = await serverMutation<ActionResponse>(path, "PATCH", { action });

    return result.success;
  } catch (error) {
    console.error(`Error executing ${action} on doctor ${doctorId}:`, error);
    return false;
  }
};