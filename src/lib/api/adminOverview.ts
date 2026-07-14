'use server'
import { protectedFetch } from "../core/server";

export interface AdminOverviewMetrics {
  totalProfit: number;
  monthlyProfit: number;
  activeDoctors: number;
  totalUsers: number;
}

export interface RevenueTrendData {
  name: string; // e.g., "Jan", "Feb"
  revenue: number;
}

export interface SpecialtyDistributionData {
  name: string; // e.g., "Pediatrics"
  appointments: number;
}

export interface AdminOverviewData {
  metrics: AdminOverviewMetrics;
  charts: {
    revenueTrend: RevenueTrendData[];
    specialtyDistribution: SpecialtyDistributionData[];
  };
}

interface ApiResponse {
  success: boolean;
  data: AdminOverviewData;
}

/**
 * Fetches the aggregated admin metrics and chart data.
 */
export const getAdminOverview = async (): Promise<AdminOverviewData | null> => {
  try {
    const result = await protectedFetch<ApiResponse>("admin/overview");
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error fetching admin overview data:", error);
    return null;
  }
};