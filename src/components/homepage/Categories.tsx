import React from "react";
import Link from "next/link";

interface CategoryItem {
  icon: React.ReactNode;
  name: string;
  description: string;
  availableCount: number;
}

export default function Categories() {
  const categoriesList: CategoryItem[] = [
    {
      icon: (
        <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.317-1.317a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      name: "General Medicine",
      description: "Your first stop for everyday health concerns, common colds, flu, and full body checkups.",
      availableCount: 14
    },
    {
      icon: (
        <svg className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      name: "Pediatrics (Child Care)",
      description: "Gentle and specialized medical care dedicated entirely to the health and growth of children.",
      availableCount: 8
    },
    {
      icon: (
        <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      name: "Dermatology (Skin)",
      description: "Expert guidance for acne treatments, skin allergies, rashes, and long-term skin health.",
      availableCount: 6
    },
    {
      icon: (
        <svg className="w-6 h-6 text-brand-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      name: "Mental Wellbeing",
      description: "Supportive, confidential therapy and consulting for stress, anxiety, sleep, and emotional health.",
      availableCount: 11
    },
    {
      icon: (
        <svg className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      name: "Dental & Oral Care",
      description: "Professional cleaning, toothaches, braces, and routine treatments for a healthy smile.",
      availableCount: 5
    },
    {
      icon: (
        <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      name: "Eye Care (Vision)",
      description: "Complete testing for prescription glasses, eye strain, dryness, and general vision protection.",
      availableCount: 7
    }
  ];

  return (
    <section className="w-full py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-3">
            Browse Medical Specialties
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-neutral-text tracking-tight">
            Find the Exact Medical Care You Need Today
          </p>
          <div className="mt-4 h-1 w-12 bg-brand-primary mx-auto rounded-full" />
        </div>

        {/* Categories Responsive Flex Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categoriesList.map((cat, idx) => (
            <Link
              key={idx}
              href={`/doctors?specialty=${encodeURIComponent(cat.name)}`}
              className="group bg-slate-50 border border-slate-100 p-6 rounded-healora shadow-sm hover:shadow-md hover:bg-white hover:border-brand-primary/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon row & Doctor counters banner */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-2.5 bg-white rounded-xl shadow-xs group-hover:bg-slate-50 transition-colors duration-300">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 group-hover:text-brand-primary transition-colors duration-200 bg-white border border-slate-200/60 px-2.5 py-1 rounded-full shadow-2xs">
                    {cat.availableCount} Specialists
                  </span>
                </div>

                {/* Typography metadata details */}
                <h3 className="text-lg font-bold text-neutral-text mb-2 tracking-tight group-hover:text-brand-primary transition-colors duration-200">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {cat.description}
                </p>
              </div>

              {/* Arrow Indicator Link Anchor Element */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-brand-primary transition-all duration-200">
                <span>View Available Slots</span>
                <svg 
                  className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}