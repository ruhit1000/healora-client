import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pt-24 pb-16 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section 1: Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
            Our Mission
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-neutral-text tracking-tight leading-tight">
            Healthcare Built Around <br />
            <span className="text-brand-accent">Your Precious Time</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-xl mx-auto">
            We believe seeing a doctor shouldn't require endless phone calls, busy signals, or hours spent sitting in crowded waiting rooms.
          </p>
        </div>

        {/* Section 2: Alternate Split Layout (The Patient Experience) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-5 text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-neutral-text tracking-tight">
              Why We Started Healora
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Traditional clinic booking is broken. Patients are forced to call blindly, guess which times are actually open, and handle confusing cancellations. 
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Healora changes everything. By introducing a real-time system that lets you instantly hold a spot the moment you click it, we make sure you grab your appointment without anyone else stepping in front of you.
            </p>
          </div>

          {/* Feature Highlight Box Panel */}
          <div className="md:col-span-5 bg-white border border-slate-100 p-8 rounded-healora shadow-sm space-y-4">
            <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl w-fit">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-neutral-text tracking-tight">Our Promise to You</h3>
            <ul className="space-y-2.5 text-xs text-slate-500 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                100% Hand-verified doctors and credentials.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                Zero double-bookings or lost slot requests.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                No hidden costs or surprise medical clinic fees.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 3: Final Call to Action Block */}
        <div className="bg-linear-to-br from-neutral-text to-slate-800 rounded-healora p-8 sm:p-12 text-center text-white shadow-md space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready for a Better Medical Booking Experience?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Find verified doctors near you, select your exact appointment time, and walk into the clinic knowing your schedule is fully protected.
            </p>
            <div className="pt-4">
              <Link
                href="/doctors"
                className="inline-flex items-center justify-center bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-sm px-8 py-3.5 rounded-healora shadow-sm transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Find Your Doctor Now
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}