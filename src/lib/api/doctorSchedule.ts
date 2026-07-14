'use server'
import { serverMutation } from "../core/server";


export interface WeeklySlot {
  day: string;
  startTime: string;
  endTime: string;
  maxPatientsAllowed: number;
}

/**
 * Surgically updates only the weekly slots array for the authenticated doctor
 */
export const updateDoctorSchedule = async (weeklySlots: WeeklySlot[]): Promise<boolean> => {
  try {
    const result = await serverMutation<{ success: boolean }>(
      "doctor/schedule",
      "PUT", // Using PUT since we are replacing the existing array
      { weeklySlots }
    );
    return result.success;
  } catch (error) {
    console.error("Error executing updateDoctorSchedule:", error);
    return false;
  }
};