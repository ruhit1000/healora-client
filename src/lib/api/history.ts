'use server'
import { protectedFetch } from "../core/server";
import { AppointmentDocument } from "./appointments";

interface HistoryResponse {
  success: boolean;
  data: AppointmentDocument[];
  message?: string;
}

/**
 * Fetches the complete archival log of completed or cancelled medical visits for the patient
 */
export const getPatientHistory = async (): Promise<AppointmentDocument[] | null> => {
  try {
    const result = await protectedFetch<HistoryResponse>("patient/dashboard/history");
    
    if (result.success) {
      return result.data;
    }
    
    return null;
  } catch (error) {
    console.error("Error executing getPatientHistory:", error);
    return null;
  }
};