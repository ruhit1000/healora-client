import React from "react";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  location: string;
  avatarInitials: string;
  badgeText: string;
  badgeBg: string;
}

export default function Testimonials() {
  const testimonialsList: TestimonialItem[] = [
    {
      quote: "I used to spend my entire morning trying to reach my family clinic over the phone just to get an appointment. With Healora, I booked a guaranteed slot in under two minutes. No waiting lines, no hassle.",
      author: "Rahat Rahman",
      role: "Patient",
      location: "Dhaka",
      avatarInitials: "RR",
      badgeText: "Verified Patient",
      badgeBg: "bg-brand-primary/10 text-brand-primary"
    },
    {
      quote: "Managing patient flow used to be incredibly chaotic. The visual dashboard allows me to set my exact availability, and the automatic slot-locking system has completely eliminated double-bookings in our clinic.",
      author: "Dr. Tasnim Alam",
      role: "Cardiologist",
      location: "Chittagong",
      avatarInitials: "TA",
      badgeText: "Verified Medical Professional",
      badgeBg: "bg-brand-accent/10 text-brand-accent"
    },
    {
      quote: "As a busy mother, I appreciate being able to choose an exact slot, show up right on time, and walk straight into the doctor's cabin. This platform respects people's time.",
      author: "Nusrat Jahan",
      role: "Patient",
      location: "Sylhet",
      avatarInitials: "NJ",
      badgeText: "Verified Patient",
      badgeBg: "bg-brand-cta/10 text-brand-cta"
    }
  ];

  return (
    <section className="w-full py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-3">
            User Testimonials
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-neutral-text tracking-tight">
            What the Community is Saying About Healora
          </p>
          <div className="mt-4 h-1 w-12 bg-brand-accent mx-auto rounded-full" />
        </div>

        {/* Testimonials Static Multi-Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsList.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-100 p-8 rounded-healora shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative"
            >
              {/* Decorative Quotation Mark Graphic Element */}
              <div className="text-6xl font-serif text-slate-100 absolute top-2 left-4 select-none pointer-events-none">
                “
              </div>

              <div className="relative z-10">
                {/* User Verification Badge */}
                <div className="mb-4">
                  <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md ${item.badgeBg}`}>
                    {item.badgeText}
                  </span>
                </div>

                {/* Patient / Doctor Quotation Content Text */}
                <p className="text-sm text-slate-600 leading-relaxed font-medium italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info Footer Identifier Block */}
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-700 border border-slate-200 shrink-0">
                  {item.avatarInitials}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-text tracking-tight">
                    {item.author}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {item.role} &bull; {item.location}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}