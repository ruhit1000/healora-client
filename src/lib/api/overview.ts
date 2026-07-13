'use server'
import { protectedFetch } from "../core/server";

// Define strict TypeScript types so your UI component knows exactly what's inside
export interface DashboardOverviewData {
  stats: {
    upcomingCount: number;
    completedCount: number;
    totalSpent: number;
  };
  nextAppointment: {
    _id: string;
    doctorId: string;
    appointmentDate: string;
    appointmentTime: string;
    bookingStatus: string;
    paymentStatus: string;
    patientDetails: {
      patientName: string;
      age: number;
      gender: string;
      reasonForVisit: string;
    };
    doctorDetails?: {
      name: string;
      specialty: string;
      location: string;
      image: string;
    };
  } | null;
  recentActivity: Array<{
    _id: string;
    appointmentDate: string;
    appointmentTime: string;
    bookingStatus: string;
    paymentStatus: string;
    consultationFee: number;
    doctorDetails?: {
      name: string;
      specialty: string;
    };
  }>;
}

interface OverviewResponse {
  success: boolean;
  data: DashboardOverviewData;
  message?: string;
}

/**
 * Fetches the aggregated stats, next appointment, and recent history for the patient dashboard
 */
export const getPatientOverview = async (): Promise<DashboardOverviewData | null> => {
  try {
    const result = await protectedFetch<OverviewResponse>("patient/dashboard/overview");
    
    if (result.success) {
      return result.data;
    }
    
    return null;
  } catch (error) {
    console.error("Error executing getPatientOverview:", error);
    return null;
  }
};