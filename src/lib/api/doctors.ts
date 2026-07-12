import { serverFetch } from "../core/server";

// =========================================================================
// 1. DATA MODEL SCHEMAS & UTILITY INTERFACES
// =========================================================================

export interface DoctorCardData {
  _id: string;
  name: string;
  title: string;
  image: string;
  specialty: string;
  fee: number;
  location: string;
  availabilitySummary: string;
  patientSatisfactoryScore: {
    averageRating: number;
  };
}

export interface DetailedDoctorSchema {
  experienceTimeline: {
    institution: string;
    role: string;
    period: string;
  }[];
  _id: string;
  name: string;
  title: string;
  image: string;
  specialty: string;
  fee: number;
  location: string;
  isApproved: boolean | string;
  biography: string;
  experienceYears: number;
  joinedAt: string;
  patientSatisfactoryScore: {
    averageRating: number;
    totalReviewsCount: number;
  };
  availabilitySummary: string;
  weeklySlots: {
    day: "Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
    startTime: string;
    endTime: string;
    maxPatientsAllowed: number;
  }[];
  reviews: {
    reviewId: string;
    patientName: string;
    patientImage?: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
}

// =========================================================================
// 2. HTTP RESPONSE ENVELOPE DEFINITIONS
// =========================================================================

export interface GetDoctorsResponse {
  success: boolean;
  meta: {
    totalDoctors: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  data: DoctorCardData[];
}

export interface GetDoctorsParams {
  search?: string;
  specialty?: string;
  page?: number;
}

export interface SpecialtiesResponse {
  success: boolean;
  data: string[];
}

export interface GetDoctorDetailsResponse {
  success: boolean;
  data: DetailedDoctorSchema;
}

// =========================================================================
// 3. API TRANSMISSION HANDLER METHODS
// =========================================================================

/**
 * Fetches a paginated list of approved doctors from the backend server.
 */
export const fetchAllDoctors = async (params: GetDoctorsParams = {}): Promise<GetDoctorsResponse> => {
  const { search, specialty, page = 1 } = params;
  const queryParts: string[] = [`page=${page}`];

  if (search && search.trim() !== "") {
    queryParts.push(`search=${encodeURIComponent(search.trim())}`);
  }

  if (specialty && specialty.trim() !== "") {
    queryParts.push(`specialty=${encodeURIComponent(specialty.trim())}`);
  }

  const queryString = queryParts.join("&");
  return serverFetch<GetDoctorsResponse>(`doctors?${queryString}`);
};

/**
 * Fetches all unique specialties belonging to active approved doctors.
 */
export const fetchDoctorSpecialties = async (): Promise<SpecialtiesResponse> => {
  return serverFetch<SpecialtiesResponse>("doctors/specialties");
};

/**
 * Fetches a single doctor's complete descriptive profile from the backend server by ID.
 */
export const fetchDoctorById = async (id: string): Promise<GetDoctorDetailsResponse> => {
  return serverFetch<GetDoctorDetailsResponse>(`doctors/${id}`);
};