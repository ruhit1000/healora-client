'use server'
import { protectedFetch } from "../core/server";

export interface AdminBookingRecord {
  _id: string;
  appointmentDate: string;
  appointmentTime: string;
  consultationFee: number;
  paymentStatus: "Paid" | "Pending" | "Cancelled";
  appointmentStatus: "Pending" | "Completed" | "Cancelled";
  createdAt: string;
  patientName: string;
  doctorName: string;
  doctorSpecialty: string;
}

export interface AdminBookingsMetrics {
  totalAppointments: number;
  grossVolume: number;
  completedCount: number;
  pendingPaymentCount: number;
}

export interface PaginationMeta {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

interface FetchBookingsQueryParams {
  page: number;
  limit: number;
  status: "All" | "Paid" | "Pending" | "Cancelled";
  search: string;
}

interface ApiResponse {
  success: boolean;
  metrics: AdminBookingsMetrics;
  pagination: PaginationMeta;
  data: AdminBookingRecord[];
}

/**
 * Fetches paginated booking logs, filters, and macro metrics for administration.
 */
export const getAdminBookingsLedger = async ({
  page,
  limit,
  status,
  search,
}: FetchBookingsQueryParams): Promise<ApiResponse | null> => {
  try {
    // 1. Build search query URL parameters dynamically
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      status: status,
      ...(search ? { search } : {}),
    });

    const result = await protectedFetch<ApiResponse>(`admin/bookings?${queryParams.toString()}`);
    return result.success ? result : null;
  } catch (error) {
    console.error("Error executing admin bookings fetch process:", error);
    return null;
  }
};