import React from "react";
import Link from "next/link";

interface HighlightItem {
  number: string;
  title: string;
  description: string;
  tag: string;
}

export default function Highlights() {
  const highlightsList: HighlightItem[] = [
    {
      number: "01",
      title: "Skip the Phone Calls & Waiting",
      description: "No more searching for clinic phone numbers or sitting on hold for hours just to speak with a receptionist. Find an open slot online, click to book, and secure your visit instantly.",
      tag: "100% Digital",
    },
    {
      number: "02",
      title: "No Crowded Waiting Rooms",
      description: "Your appointment time is exact and guaranteed. Walk into the clinic right when your slot starts and see your verified doctor immediately without waiting in lines.",
      tag: "Save Time",
    },
    {
      number: "03",
      title: "Full Digital Health History",
      description: "Keep track of all your upcoming appointments, past medical visits, and prescription notes securely inside your private patient dashboard with single-click access.",
      tag: "All-In-One",
    }
  ];

  return (
    <section className="w-full py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Layout Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-3">
            Platform Highlights
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-neutral-text tracking-tight">
            Designed to Make Healthcare Stress-Free
          </p>
          <div className="mt-4 h-1 w-12 bg-brand-accent mx-auto rounded-full" />
        </div>

        {/* Highlights Alternate Layout Stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlightsList.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-100 p-8 rounded-healora shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Large structural backdrop numbering design layout */}
              <div className="absolute -top-6 -right-4 text-7xl font-black text-slate-100/70 select-none group-hover:text-slate-200/50 transition-colors duration-300">
                {item.number}
              </div>

              <div>
                {/* Mini category chip badge tag element */}
                <div className="mb-6">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md border border-slate-200/40">
                    {item.tag}
                  </span>
                </div>

                {/* Typography content wrapper block */}
                <h3 className="text-xl font-bold text-neutral-text mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              {/* Minimalist lower progress accent bar element */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Healora Protection Active
                </span>
                <div className="w-8 h-1 bg-slate-200 rounded-full group-hover:w-16 group-hover:bg-brand-primary transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom callout encouraging users to advance seamlessly */}
        <div className="mt-16 text-center">
          <Link
            href="/doctors"
            className="inline-flex items-center space-x-2 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 px-6 py-3 rounded-healora shadow-sm transition-all duration-200"
          >
            <span>Browse Active Doctors Now</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}