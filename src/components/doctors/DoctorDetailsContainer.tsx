"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { DetailedDoctorSchema } from "@/lib/api/doctors";

interface DoctorDetailsContainerProps {
  doctor: DetailedDoctorSchema;
}

export default function DoctorDetailsContainer({ doctor }: DoctorDetailsContainerProps) {
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

  const handleBookingExecution = () => {
    if (selectedSlotIndex === null) return;
    const chosenSlot = doctor.weeklySlots[selectedSlotIndex];
    alert(`Initiating scheduling sequence for ${doctor.name} on ${chosenSlot.day} at ${chosenSlot.startTime}`);
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* ==========================================
          COLUMN 1: MASTER PROFILE DETAILS FEED (8 COLS)
          ========================================== */}
      <main className="lg:col-span-8 space-y-6">
        
        {/* HEROBIOGRAPHY BRIEFING BLOCK */}
        <section className="bg-white p-6 rounded-healora border border-slate-100 shadow-xs flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          
          {/* STATIC LAYOUT CONSTRAINT BOUNDARY FRAME */}
          <div className="w-44 h-44 bg-slate-50 rounded-xl overflow-hidden shrink-0 relative block mx-auto sm:mx-0">
            <Image 
              src={doctor.image} 
              alt={doctor.name} 
              fill
              sizes="176px"
              priority
              className="object-cover object-top"
            />
          </div>
          
          {/* TYPOGRAPHY CONTENT REGISTER */}
          <div className="flex flex-col justify-between py-1 space-y-3 flex-1 w-full text-center sm:text-left">
            <div className="space-y-1">
              <span className="bg-brand-primary/10 text-brand-primary px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider inline-block">
                {doctor.specialty}
              </span>
              <h1 className="text-xl font-black text-neutral-text tracking-tight pt-1">{doctor.name}</h1>
              <p className="text-xs text-slate-500 font-semibold">{doctor.title}</p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-xs font-bold text-slate-600">
              <span>📍 {doctor.location}</span>
              <span>💼 {doctor.experienceYears} Years Active</span>
              <span>⭐ {doctor.patientSatisfactoryScore?.averageRating || "N/A"} ({doctor.patientSatisfactoryScore?.totalReviewsCount || 0} reviews)</span>
            </div>
          </div>
        </section>

        {/* COMPREHENSIVE NARRATIVE FIELD */}
        <section className="bg-white p-6 rounded-healora border border-slate-100 shadow-xs space-y-3">
          <h2 className="text-sm font-black text-neutral-text uppercase tracking-tight">Biography Overview</h2>
          <p className="text-xs leading-relaxed text-slate-500 font-medium whitespace-pre-line">
            {doctor.biography || "No diagnostic practice layout parameters provided by medical registrar."}
          </p>
        </section>

        {/* REVIEWS GRID RECORDS */}
        <section className="bg-white p-6 rounded-healora border border-slate-100 shadow-xs space-y-4">
          <h2 className="text-sm font-black text-neutral-text uppercase tracking-tight">
            Patient Feedback ({doctor.reviews?.length || 0})
          </h2>
          {(!doctor.reviews || doctor.reviews.length === 0) ? (
            <p className="text-xs text-slate-400 font-medium py-2">No consumer review evaluations listed yet.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {doctor.reviews.map((rev) => (
                <div key={rev.reviewId} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-black text-slate-700">{rev.patientName}</span>
                    <span className="text-[10px] text-brand-primary font-bold">⭐ {rev.rating}.0 / 5.0</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ==========================================
          COLUMN 2: STICKY TRANSACTIONAL SCHEDULER SIDEBAR (4 COLS)
          ========================================== */}
      <aside className="lg:col-span-4 bg-white rounded-healora border border-slate-100 shadow-xs overflow-hidden sticky top-32 space-y-5 p-6 w-full">
        <div>
          <h3 className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Consultation Session Fee</h3>
          <p className="text-2xl font-black text-neutral-text pt-0.5">৳ {doctor.fee}</p>
        </div>

        <hr className="border-slate-100" />

        <div className="space-y-2.5">
          <h4 className="text-xs font-black text-slate-700 uppercase tracking-tight">Available Consultation Slots</h4>
          {(!doctor.weeklySlots || doctor.weeklySlots.length === 0) ? (
            <p className="text-xs text-slate-400 font-semibold">No booking calendar allocations mapped for this week.</p>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {doctor.weeklySlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedSlotIndex(index)}
                  className={`w-full text-left p-3 border rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedSlotIndex === index
                      ? "border-brand-primary bg-brand-primary/5 text-brand-primary font-bold"
                      : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>📅 {slot.day}</span>
                    <span className="text-[11px] opacity-95">{slot.startTime} - {slot.endTime}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          variant="primary"
          className="w-full font-bold text-xs py-5 rounded-xl shadow-xs disabled:opacity-50 cursor-pointer"
          isDisabled={selectedSlotIndex === null}
          onPress={handleBookingExecution}
        >
          {selectedSlotIndex !== null ? "Proceed to Appointment" : "Select an Open Slot"}
        </Button>
      </aside>

    </div>
  );
}