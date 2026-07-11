import { serverFetch } from "../core/server";

// 1. Explicitly define the Doctor Object Interface matching your database projection
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

// 2. Define the exact shape of the response returning from your Express server
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

// 3. Define arguments interface for strict filtering parameters
export interface GetDoctorsParams {
  search?: string;
  specialty?: string;
  page?: number;
}

/**
 * Fetches a paginated list of approved doctors from the backend server.
 */
export const fetchAllDoctors = async (params: GetDoctorsParams = {}): Promise<GetDoctorsResponse> => {
  const { search, specialty, page = 1 } = params;
  
  // Construct dynamic URL Search Query Parameters safely
  const queryParts: string[] = [`page=${page}`];

  if (search && search.trim() !== "") {
    queryParts.push(`search=${encodeURIComponent(search.trim())}`);
  }

  if (specialty && specialty.trim() !== "") {
    queryParts.push(`specialty=${encodeURIComponent(specialty.trim())}`);
  }

  const queryString = queryParts.join("&");
  const endpoint = `doctors?${queryString}`;

  // Call your core server fetch layout engine passing the expected response interface
  return serverFetch<GetDoctorsResponse>(endpoint);
};

export interface SpecialtiesResponse {
  success: boolean;
  data: string[];
}

export const fetchDoctorSpecialties = async (): Promise<SpecialtiesResponse> => {
  return serverFetch<SpecialtiesResponse>("doctors/specialties");
};