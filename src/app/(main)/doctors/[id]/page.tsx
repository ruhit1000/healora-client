import React from "react";
import { notFound } from "next/navigation";
import { fetchDoctorById } from "@/lib/api/doctors";
import DoctorDetailsContainer from "@/components/doctors/DoctorDetailsContainer";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  
  // Call your type-safe API handler
  const response = await fetchDoctorById(resolvedParams.id);

  // Structural Guard: Fallback to 404 page if record fetching errors out
  if (!response || !response.success || !response.data) {
    notFound();
  }

  const doctorData = response.data;

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <DoctorDetailsContainer doctor={doctorData} />
    </div>
  );
}