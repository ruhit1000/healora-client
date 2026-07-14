'use server'
import { protectedFetch } from "../core/server";


export interface Transaction {
  _id: string;
  appointmentDate: string;
  patientName: string;
  stripeSessionId: string;
  paymentStatus: "Paid" | "Pending" | string;
  consultationFee: number;
}

export interface EarningsMetrics {
  totalEarned: number;
  pendingAmount: number;
  totalPaidAppointments: number;
  thisMonthEarned: number;
}

export interface EarningsResponseData {
  metrics: EarningsMetrics;
  transactions: Transaction[];
}

interface ApiResponse {
  success: boolean;
  data: EarningsResponseData;
}

/**
 * Fetches the aggregated financial metrics and recent transactions for the logged-in doctor.
 */
export const getDoctorEarnings = async (): Promise<EarningsResponseData | null> => {
  try {
    const result = await protectedFetch<ApiResponse>("doctor/earnings");
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error fetching doctor earnings:", error);
    return null;
  }
};