import React from "react";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

export default function Features() {
  const featuresList: FeatureItem[] = [
    {
      icon: (
        <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Saved Just for You",
      description: "When you click on an available time slot, it is instantly held for you for 5 minutes. No one else can take it while you finish typing your appointment notes.",
      badge: "No Double Booking"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Real, Certified Doctors",
      description: "We verify every single medical professional's degree and license by hand. You can rest easy knowing you are always talking to a real expert.",
      badge: "100% Verified"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-brand-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Easy Schedule Control",
      description: "Doctors get a visual, stress-free dashboard to set their own hours, view their daily patient lists, and manage their practice with single-click buttons.",
      badge: "For Doctors"
    }
  ];

  return (
    <section className="w-full py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-3">
            How Healora Helps You
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-neutral-text tracking-tight">
            The Easiest Way to Book Your Next Doctor Visit
          </p>
          <div className="mt-4 h-1 w-12 bg-brand-primary mx-auto rounded-full" />
        </div>

        {/* Features Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresList.map((feature, idx) => (
            <div 
              key={idx}
              className="group relative bg-slate-50 border border-slate-100 p-8 rounded-healora shadow-sm hover:shadow-md hover:bg-white hover:border-brand-primary/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Row within Card */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-white rounded-xl shadow-xs group-hover:bg-slate-50 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  {feature.badge && (
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 bg-slate-200/60 text-slate-600 rounded-md">
                      {feature.badge}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <h3 className="text-xl font-bold text-neutral-text mb-3 tracking-tight group-hover:text-brand-primary transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>

              {/* Decorative bottom hover accent line */}
              <div className="mt-6 pt-2 w-0 group-hover:w-full h-0.5 bg-linear-to-r from-brand-primary to-brand-accent transition-all duration-300 rounded-full" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}