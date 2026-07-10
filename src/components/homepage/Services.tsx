import React from "react";
import Link from "next/link";

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
  actionHref: string;
  accentColor: string; // Used to safely apply themed background highlights
}

export default function Services() {
  const servicesList: ServiceItem[] = [
    {
      icon: (
        <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "In-Person Appointments",
      description: "Find local, verified experts near you. Choose a secure, guaranteed time slot and skip the crowded clinic waiting rooms entirely.",
      actionText: "Book a Visit",
      actionHref: "/doctors",
      accentColor: "bg-brand-primary/10"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: "Video Consultations",
      description: "Speak with your doctor from the comfort of your home. Secure face-to-face video calls without needing to travel when you are unwell.",
      actionText: "Start Video Chat",
      actionHref: "/dashboard",
      accentColor: "bg-brand-accent/10"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-brand-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Digital Prescriptions",
      description: "Receive officially signed, clear digital prescriptions straight to your patient account dashboard immediately after your consultation ends.",
      actionText: "View My History",
      actionHref: "/dashboard",
      accentColor: "bg-brand-cta/10"
    }
  ];

  return (
    <section className="w-full py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-3">
            Our Core Services
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-neutral-text tracking-tight">
            Complete Care Tailored Around Your Schedule
          </p>
          <div className="mt-4 h-1 w-12 bg-brand-accent mx-auto rounded-full" />
        </div>

        {/* Services Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-100 p-8 rounded-healora shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon Wrapper Circle */}
                <div className={`p-3 inline-block rounded-xl mb-6 ${service.accentColor}`}>
                  {service.icon}
                </div>

                {/* Service Heading and Body Context */}
                <h3 className="text-xl font-bold text-neutral-text mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
                  {service.description}
                </p>
              </div>

              {/* Action Button Link matching PRD layout guidelines */}
              <div>
                <Link
                  href={service.actionHref}
                  className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-brand-primary/80 group transition-colors duration-200"
                >
                  <span>{service.actionText}</span>
                  <svg 
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}