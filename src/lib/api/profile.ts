'use server'
import { protectedFetch, serverMutation } from "../core/server";


export interface PatientProfileData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  address: string;
  emergencyContact: string;
}

interface ProfileResponse {
  success: boolean;
  data: PatientProfileData;
  message?: string;
}

export const getPatientProfile = async (): Promise<PatientProfileData | null> => {
  try {
    const result = await protectedFetch<ProfileResponse>("patient/profile");
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error executing getPatientProfile:", error);
    return null;
  }
};

export const updatePatientProfile = async (payload: PatientProfileData): Promise<boolean> => {
  try {
    const result = await serverMutation<{ success: boolean }>(
      "patient/profile",
      "POST",
      payload
    );
    return result.success;
  } catch (error) {
    console.error("Error executing updatePatientProfile:", error);
    return false;
  }
};