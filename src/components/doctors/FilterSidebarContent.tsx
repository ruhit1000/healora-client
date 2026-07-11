"use client";

import React from "react";

interface FilterProps {
  selectedSpecialty: string;
  onSelectSpecialty: (specialty: string) => void;
  specialties: string[];
}

export default function FilterSidebarContent({ selectedSpecialty, onSelectSpecialty, specialties }: FilterProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Specialties</h3>
      <div className="space-y-1.5">
        
        <button
          type="button"
          onClick={() => onSelectSpecialty("")}
          className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            selectedSpecialty === ""
              ? "bg-brand-primary/10 text-brand-primary font-bold"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          }`}
        >
          All Specialties
        </button>

        {specialties.map((spec) => (
          <button
            key={spec}
            type="button"
            onClick={() => onSelectSpecialty(spec)}
            className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              selectedSpecialty === spec
                ? "bg-brand-primary/10 text-brand-primary font-bold"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            {spec}
          </button>
        ))}
      </div>
    </div>
  );
}