import React from "react";
import { notFound } from "next/navigation";
import { fetchDoctorById } from "@/lib/api/doctors";
import DoctorDetailsContainer from "@/components/doctors/DoctorDetailsContainer";
import { getUserSession } from "@/lib/core/session";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const resolvedParams = await params;

  // 1. Resolve the active user session context in parallel or sequentially on the server
  const user = await getUserSession();
  
  // 2. Fetch the complete doctor data matching the URL segment identifier
  const response = await fetchDoctorById(resolvedParams.id);

  // 3. Structural Guard: Fallback to a clean 404 page if no record exists
  if (!response || !response.success || !response.data) {
    notFound();
  }

  const doctorData = response.data;

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      {/* 4. Pass down both the database payload and current user context to handle client-side guards */}
      <DoctorDetailsContainer 
        doctor={doctorData} 
        currentUser={user} 
      />
    </div>
  );
}