import React from 'react';

// 1. Package Data (Easy to edit or fetch from a database later)
const healthPackages = [
  {
    id: "individual",
    name: "Individual Plan",
    target: "For 1 Person",
    price: "৳1,500",
    billing: "/month",
    description: "Essential, everyday health coverage for a single individual.",
    features: [
      "1 General Physician Consult",
      "24/7 Telemedicine Access",
      "Basic Blood Work (Once/yr)",
      "5% Pharmacy Discount"
    ],
    isPopular: false,
    buttonText: "Get Started"
  },
  {
    id: "duo",
    name: "Duo Plan",
    target: "For 2 People",
    price: "৳2,800",
    billing: "/month",
    description: "Perfect for couples, partners, or two family members.",
    features: [
      "3 General Physician Consults",
      "24/7 Telemedicine Access",
      "Advanced Diagnostics",
      "10% Pharmacy Discount",
      "1 Specialist Consult"
    ],
    isPopular: true,
    buttonText: "Choose Duo"
  },
  {
    id: "family",
    name: "Family Plan",
    target: "Up to 5 People",
    price: "৳5,000",
    billing: "/month",
    description: "Comprehensive care and priority access for the whole family.",
    features: [
      "10 General Physician Consults",
      "24/7 Telemedicine Access",
      "Free Home Sample Collection",
      "20% Pharmacy Discount",
      "3 Specialist Consults",
      "Priority Slot Booking"
    ],
    isPopular: false,
    buttonText: "Protect Your Family"
  }
];

// 2. Checkmark Icon Component
const CheckIcon = () => (
  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

// 3. Main Page Component
const HealthPlanPackage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
        <h2 className="text-brand-primary font-bold tracking-wider uppercase text-sm">Pricing Plans</h2>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl">
          Health coverage that fits your life.
        </h1>
        <p className="text-lg text-slate-500 font-medium">
          Choose the perfect health package for you, your partner, or your entire family. No hidden fees.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {healthPackages.map((pkg) => (
          <div 
            key={pkg.id} 
            className={`relative bg-white rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-2 ${
              pkg.isPopular 
                ? "ring-2 ring-brand-primary shadow-2xl scale-100 md:scale-105 z-10" 
                : "border border-slate-200 shadow-lg scale-100"
            }`}
          >
            {/* Popular Badge */}
            {pkg.isPopular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
                Most Popular
              </div>
            )}

            {/* Card Header */}
            <div className="mb-8">
              <h3 className="text-xl font-black text-slate-900">{pkg.name}</h3>
              <p className="text-sm font-bold text-slate-400 mb-4">{pkg.target}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">{pkg.price}</span>
                <span className="text-sm font-bold text-slate-500">{pkg.billing}</span>
              </div>
              <p className="mt-4 text-sm text-slate-600 font-medium leading-relaxed">
                {pkg.description}
              </p>
            </div>

            {/* Feature List */}
            <ul className="space-y-4 mb-8">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm font-bold text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Call to Action Button */}
            <button
              className={`w-full py-4 rounded-xl text-sm font-black transition-colors ${
                pkg.isPopular
                  ? "bg-brand-primary text-white shadow-md hover:bg-brand-primary/90"
                  : "bg-slate-100 text-slate-800 hover:bg-slate-200"
              }`}
            >
              {pkg.buttonText}
            </button>

          </div>
        ))}
      </div>

      {/* FAQ / Trust Footer */}
      <div className="max-w-3xl mx-auto mt-20 text-center">
        <p className="text-sm font-bold text-slate-500">
          Need help choosing? <a href="/contact" className="text-brand-primary underline hover:text-slate-800 transition-colors">Contact our support team</a> for a free consultation.
        </p>
      </div>

    </div>
  );
};

export default HealthPlanPackage;