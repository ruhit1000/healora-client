import Link from "next/link";
import HeroSlider from "./HeroSlider";

export default function Hero() {
  const specialtiesList = [
    "Cardiologists",
    "Pediatricians",
    "Dermatologists",
    "Neurologists",
    "General Doctors"
  ];

  return (
    <section className="relative w-full h-[75vh] min-h-137.5 max-h-200 flex items-center bg-linear-to-br from-slate-50 via-white to-sky-50/50 pt-16 overflow-hidden">
      
      {/* Background Graphic Blurs */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Core Value Propositions & Call-to-Actions */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-6 text-center md:text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center self-center md:self-start space-x-2 bg-brand-accent/10 text-brand-accent px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-brand-accent/20">
            <span className="flex h-2 w-2 relative">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            <span>✨ Seamless Concurrency Slot Booking</span>
          </div>

          {/* Headline with Isolated Client Slider Component */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-text tracking-tight leading-tight">
            Your Health, <br />
            Right on Schedule With <br />
            <HeroSlider specialties={specialtiesList} />
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto md:mx-0 font-medium">
            Connect instantly with verified medical professionals. Claim an exclusive time slot secured just for you—no double-bookings, no long queues.
          </p>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
            <Link
              href="/doctors"
              className="w-full sm:w-auto text-center px-8 py-3.5 text-sm font-semibold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-healora shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Find Your Doctor
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto text-center px-8 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-healora border border-slate-200 shadow-sm transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Column: Clean Responsive Layout Engine */}
        <div className="hidden md:flex md:col-span-5 relative w-full h-full items-center justify-center">
          <div className="relative w-full max-w-95 aspect-4/5 bg-white rounded-healora border border-slate-100 shadow-xl p-5 transform rotate-2 hover:rotate-0 transition-transform duration-300">
            
            {/* Frame Top Decorator */}
            <div className="flex items-center space-x-1.5 border-b border-slate-100 pb-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-[11px] text-slate-400 font-mono pl-2">healora.com/booking-engine</span>
            </div>

            {/* Mockup Internal Layout */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center space-x-3">
                <div className="w-12 h-12 bg-sky-100 rounded-full shrink-0 flex items-center justify-center font-bold text-brand-primary">Dr</div>
                <div className="space-y-1">
                  <div className="h-3 w-24 bg-slate-200 rounded" />
                  <div className="h-2 w-16 bg-slate-100 rounded" />
                </div>
              </div>

              {/* Slot Indicator Card */}
              <div className="border border-brand-cta/30 bg-amber-50/60 p-3 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">Selected Slot</span>
                  <span className="text-[10px] bg-brand-cta text-white font-bold px-1.5 py-0.5 rounded">LOCKED</span>
                </div>
                <div className="h-8 bg-white border border-slate-200 rounded-lg flex items-center px-3 justify-between text-xs text-brand-primary font-bold">
                  <span>Today, 04:30 PM</span>
                  <span className="text-[11px] text-brand-cta">04:59 left</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="h-2 w-full bg-slate-100 rounded" />
                <div className="h-2 w-5/6 bg-slate-100 rounded" />
              </div>

              <div className="h-10 w-full bg-brand-primary/10 border border-brand-primary/20 rounded-healora flex items-center justify-center text-xs text-brand-primary font-bold">
                Processing Secure Session...
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}