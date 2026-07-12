const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export const getBookedSlots = async (doctorId: string, date: string): Promise<string[]> => {
  // Use the public env variable, fallback to localhost if it's missing during local dev

  try {
    const response = await fetch(`${baseUrl}/api/bookings/schedule?doctorId=${doctorId}&date=${date}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      return result.data; // Expected: ["09:00 AM", "09:08 AM"]
    }
    
    return [];
  } catch (error) {
    console.error("Failed to fetch booked slots:", error);
    return [];
  }
};