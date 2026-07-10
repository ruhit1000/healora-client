import React from "react";

interface StatItem {
  value: string;
  label: string;
  description: string;
  borderAccent: string;
}

export default function Statistics() {
  const statsList: StatItem[] = [
    {
      value: "99.8%",
      label: "Booking Success Rate",
      description: "Our secure system guarantees that once you lock a time slot, it cannot be double-booked by anyone else.",
      borderAccent: "border-t-brand-primary"
    },
    {
      value: "10,000+",
      label: "Happy Patients",
      description: "Thousands of everyday users have completely skipped phone calls and busy waiting lines using Healora.",
      borderAccent: "border-t-brand-accent"
    },
    {
      value: "500+",
      label: "Verified Doctors",
      description: "Every single medical professional on our platform has passed a manual degree and license check.",
      borderAccent: "border-t-brand-cta"
    }
  ];

  return (
    <section className="w-full py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-3">
            Healora In Numbers
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-neutral-text tracking-tight">
            Trusted by Thousands for Fast, Secure Care
          </p>
          <div className="mt-4 h-1 w-12 bg-brand-primary mx-auto rounded-full" />
        </div>

        {/* Stats Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsList.map((stat, idx) => (
            <div 
              key={idx}
              className={`bg-slate-50 border-t-4 ${stat.borderAccent} border-x border-b border-slate-100 p-8 rounded-healora shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col justify-center`}
            >
              {/* Massive Metric Display */}
              <div className="text-4xl sm:text-5xl font-black text-neutral-text tracking-tight mb-2">
                {stat.value}
              </div>
              
              {/* Patient Friendly Label */}
              <div className="text-base font-bold text-slate-800 tracking-tight mb-2">
                {stat.label}
              </div>
              
              {/* Short descriptive text */}
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}