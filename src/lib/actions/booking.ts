"use server";

import { serverMutation } from "@/lib/core/server";

export interface CheckoutPayload {
  doctorId: string;
  patientUserId?: string;
  appointmentDate: string | null;
  appointmentTime: string | null;
  intake: {
    patientName: string;
    age: string;
    gender: string;
    reason: string;
  };
}

export interface CheckoutResponse {
  success: boolean;
  url?: string;
  message?: string;
}

export const initializeCheckout = async (payload: CheckoutPayload): Promise<CheckoutResponse> => {
  // We pass "bookings/initialize" because your serverMutation automatically prepends the `/api/`
  return serverMutation<CheckoutResponse>("bookings/initialize", "POST", payload);
};