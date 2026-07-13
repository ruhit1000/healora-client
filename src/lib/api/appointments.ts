'use server'
import { protectedFetch } from "../core/server";


export interface AppointmentDocument {
  _id: string;
  patientUserId: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  patientDetails: {
    patientName: string;
    age: number;
    gender: string;
    reasonForVisit: string;
  };
  consultationFee: number;
  bookingStatus: "Locked" | "Confirmed" | "Completed" | "Cancelled";
  paymentStatus: "Pending" | "Paid";
  stripeSessionId?: string;
  createdAt: string;
  updatedAt: string;
  doctorDetails?: {
    name: string;
    specialty: string;
    image: string;
    location: string;
  };
}

interface AppointmentsResponse {
  success: boolean;
  data: {
    confirmed: AppointmentDocument[];
    pending: AppointmentDocument[];
  };
  message?: string;
}

/**
 * Fetches categorized active (confirmed) and pending (locked) appointments for the logged-in patient
 */
export const getPatientAppointments = async (): Promise<AppointmentsResponse["data"] | null> => {
  try {
    const result = await protectedFetch<AppointmentsResponse>("patient/dashboard/appointments");
    
    if (result.success) {
      return result.data;
    }
    
    return null;
  } catch (error) {
    console.error("Error executing getPatientAppointments:", error);
    return null;
  }
};