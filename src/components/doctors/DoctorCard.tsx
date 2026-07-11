import React from "react";
import { DoctorCardData } from "@/lib/api/doctors";
import Link from "next/link";

interface DoctorCardProps {
  doctor: DoctorCardData;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-healora shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden">
      
      {/* Upper Biographical section */}
      <div className="p-4 space-y-3">
        <div className="relative aspect-square w-full bg-slate-100 rounded-lg overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs border border-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-brand-primary shadow-xs">
            {doctor.specialty}
          </div>
        </div>

        <div className="space-y-0.5">
          <h4 className="text-sm font-black text-neutral-text tracking-tight truncate">
            {doctor.name}
          </h4>
          <p className="text-[11px] text-slate-400 font-medium truncate">
            {doctor.title}
          </p>
        </div>

        {/* Location & Logistical tags */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-[11px] font-semibold text-slate-500 pt-1">
          <div className="flex items-center gap-1">
            <span>📍 {doctor.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⭐ {doctor.patientSatisfactoryScore?.averageRating || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="bg-slate-50/60 px-4 py-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Consultation</span>
          <span className="text-xs font-black text-neutral-text">৳ {doctor.fee}</span>
        </div>
        
        <Link
          href={`/doctors/${doctor._id}`}
          className="px-3.5 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white text-[11px] font-bold rounded-lg transition-colors shadow-xs"
        >
          Book Slot
        </Link>
      </div>

    </div>
  );
}