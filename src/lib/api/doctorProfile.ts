'use server'
import { protectedFetch, serverMutation } from "../core/server";

export interface DoctorProfileData {
  _id?: string;
  userId?: string; 
  name: string;
  title: string;
  image: string;
  specialty: string;
  fee: number;
  followUpFee: number;
  followUpWindowDays: number;
  location: string;
  bmdcNumber: string;
  experienceYears: number;
  hospitalAffiliation: string;
  availabilitySummary: string;
  appointmentConsultationTime: string;
  biography: string;
  isApproved?: boolean;
  patientSatisfactoryScore?: {
    averageRating: number;
    totalReviewsCount: number;
  };
  experienceTimeline?: Array<{
    institution: string;
    role: string;
    period: string;
  }>;
  weeklySlots?: Array<{
    day: string;
    startTime: string;
    endTime: string;
    maxPatientsAllowed: number;
  }>;
  reviews?: Array<{
    reviewId: string;
    patientName: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>;
}

interface ProfileResponse {
  success: boolean;
  data: DoctorProfileData | null;
}

export const getDoctorProfile = async (): Promise<DoctorProfileData | null> => {
  try {
    const result = await protectedFetch<ProfileResponse>("doctor/profile");
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error in getDoctorProfile:", error);
    return null;
  }
};

export const updateDoctorProfile = async (payload: Omit<DoctorProfileData, "_id" | "isApproved" | "patientSatisfactoryScore">): Promise<boolean> => {
  try {
    const result = await serverMutation<{ success: boolean }>("doctor/profile", "POST", payload);
    return result.success;
  } catch (error) {
    console.error("Error in updateDoctorProfile:", error);
    return false;
  }
};