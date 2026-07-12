"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { DetailedDoctorSchema } from "@/lib/api/doctors";
import BookingModal from "./BookingModal";

// Accurately typing your user session object
interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface DoctorDetailsContainerProps {
  doctor: DetailedDoctorSchema;
  currentUser?: CurrentUser | null;
}

type TabType = "info" | "experience" | "reviews";

export default function DoctorDetailsContainer({ doctor, currentUser }: DoctorDetailsContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<TabType>("info");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // The Gatekeeper Logic
  const handleCTAAction = () => {
    if (!currentUser || !currentUser.id) {
      const redirectParams = new URLSearchParams({ callbackUrl: pathname });
      router.push(`/login?${redirectParams.toString()}`);
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* ==========================================
          HEADER HERO CARD PANEL
          ========================================== */}
      <header className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center flex-1">
          <div className="w-36 h-36 bg-slate-50 rounded-2xl overflow-hidden shrink-0 relative border border-slate-100">
            <Image
              src={doctor.image}
              alt={doctor.name}
              fill
              sizes="144px"
              priority
              className="object-cover object-top"
            />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-xs">
              Online
            </span>
          </div>

          <div className="space-y-3 flex-1">
            <div className="space-y-1">
              <h1 className="text-xl font-black text-slate-800 tracking-tight">{doctor.name}</h1>
              <p className="text-xs text-slate-500 font-semibold">{doctor.title}</p>
              <span className="bg-brand-primary/10 text-brand-primary px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider inline-block">
                {doctor.specialty}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-sm border-t border-slate-50 pt-3">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Experience</p>
                <p className="text-xs font-black text-slate-700">{doctor.experienceYears}+ Years</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Total Rating</p>
                <p className="text-xs font-black text-slate-700">⭐ {doctor.patientSatisfactoryScore?.averageRating || "0.0"} ({doctor.patientSatisfactoryScore?.totalReviewsCount || 0})</p>
              </div>
            </div>
          </div>
        </div>

        {/* SIDE TRANSACTION BLOCK */}
        <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-2 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 min-w-50">
          <div className="text-center md:text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Consultation Fee</p>
            <p className="text-2xl font-black text-brand-primary">৳{doctor.fee} <span className="text-[10px] text-slate-400 font-normal">(Inc. VAT)</span></p>
          </div>
          <Button
            className="w-full bg-brand-primary text-white font-black text-xs py-5 rounded-xl transition-all cursor-pointer shadow-xs"
            onPress={handleCTAAction}
          >
            Book Now
          </Button>
        </div>
      </header>

      {/* ==========================================
          NAVIGATIONAL LAYOUT SECTIONS GRID
          ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <main className="lg:col-span-8 space-y-6">

          {/* TAB SWITCH BAR */}
          <nav className="flex gap-6 border-b border-slate-200 text-xs font-bold">
            {(["info", "experience", "reviews"] as TabType[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-3 capitalize transition-all cursor-pointer relative ${activeTab === tab ? "text-brand-primary font-black" : "text-slate-400 hover:text-slate-600"
                  }`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full" />}
              </button>
            ))}
          </nav>

          {/* TAB CANVAS CONTENT BLOCK */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs min-h-62.5">
            {activeTab === "info" && (
              <section className="space-y-3 animate-fadeIn">
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">About Doctor</h2>
                <p className="text-xs leading-relaxed text-slate-500 font-medium whitespace-pre-line">{doctor.biography}</p>
                <p className="text-xs text-slate-400 pt-2 font-medium">📍 Serving Chamber Location: <span className="text-slate-600 font-bold">{doctor.location}</span></p>
              </section>
            )}

            {activeTab === "experience" && (
              <section className="space-y-4 animate-fadeIn">
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">Employment History</h2>
                {(!doctor.experienceTimeline || doctor.experienceTimeline.length === 0) ? (
                  <p className="text-xs text-slate-400 font-medium">No experience history mapped yet.</p>
                ) : (
                  <div className="space-y-4 relative border-l-2 border-slate-100 pl-4 ml-2">
                    {doctor.experienceTimeline.map((exp: { period: string; role: string; institution: string }, idx: number) => (
                      <div key={idx} className="relative space-y-0.5">
                        <div className="absolute -left-5.25 top-1 w-2.5 h-2.5 bg-brand-primary rounded-full ring-4 ring-white" />
                        <span className="text-[10px] text-brand-primary font-bold">{exp.period}</span>
                        <h4 className="text-xs font-black text-slate-700">{exp.role}</h4>
                        <p className="text-xs text-slate-400 font-medium">{exp.institution}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === "reviews" && (
              <section className="space-y-4 animate-fadeIn">
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">Patient Reviews ({doctor.reviews?.length || 0})</h2>
                <div className="divide-y divide-slate-50">
                  {doctor.reviews?.map((rev) => (
                    <div key={rev.reviewId} className="py-4 first:pt-0 last:pb-0 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-slate-700">{rev.patientName}</span>
                        <span className="text-[10px] text-amber-500 font-bold">⭐ {rev.rating}.0 / 5.0</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{rev.comment}</p>
                      <span className="text-[9px] text-slate-400 font-semibold block pt-1">{rev.createdAt}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>

        {/* SIDE BAR LEDGER */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight">At a Glance</h3>
            <div className="space-y-3 text-xs font-medium">
              <div className="bg-slate-50 p-3 rounded-xl space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Consultation Fee</p>
                <p className="text-sm font-black text-slate-700">৳{doctor.fee}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* THE MODAL SHELL */}
      <BookingModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        doctor={doctor}
        currentUser={currentUser}
      />
    </div>
  );
}