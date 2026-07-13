'use server';
import { protectedFetch } from "../core/server";
import { AppointmentDocument } from "./appointments";

export interface DoctorDashboardData {
  isApproved: boolean;
  stats: {
    remainingToday: number;
    completedToday: number;
    earningsToday: number;
  };
  queue: AppointmentDocument[];
}

interface DoctorOverviewResponse {
  success: boolean;
  data: DoctorDashboardData;
  message?: string;
}

/**
 * Fetches the daily real-time queue, statistics, and validation flags for the logged-in doctor
 */
export const getDoctorOverview = async (): Promise<DoctorDashboardData | null> => {
  try {
    const result = await protectedFetch<DoctorOverviewResponse>("doctor/dashboard/overview");
    
    if (result.success) {
      return result.data;
    }
    
    return null;
  } catch (error) {
    console.error("Error executing getDoctorOverview:", error);
    return null;
  }
};