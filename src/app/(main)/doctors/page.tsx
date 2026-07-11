import React from 'react';
import { fetchAllDoctors, fetchDoctorSpecialties } from '@/lib/api/doctors';
import DoctorsContainer from '@/components/doctors/DoctorsContainer';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    specialty?: string;
  }>;
}

const AllDoctorsPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  
  const currentPage = params.page ? parseInt(params.page, 10) : 1;
  const currentSearch = params.search || "";
  const currentSpecialty = params.specialty || "";

  const [doctorsResponse, specialtiesResponse] = await Promise.all([
    fetchAllDoctors({ page: currentPage, search: currentSearch, specialty: currentSpecialty }),
    fetchDoctorSpecialties()
  ]);

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <DoctorsContainer 
        initialData={doctorsResponse.data || []} 
        meta={doctorsResponse.meta}
        availableSpecialties={specialtiesResponse.data || []}
        initialFilters={{
          search: currentSearch,
          specialty: currentSpecialty,
          page: currentPage
        }}
      />
    </div>
  );
};

export default AllDoctorsPage;