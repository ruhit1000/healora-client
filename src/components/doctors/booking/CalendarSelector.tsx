"use client";

import React, { useMemo, useEffect } from "react";
import { DetailedDoctorSchema } from "@/lib/api/doctors";

interface CalendarSelectorProps {
  doctor: DetailedDoctorSchema;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

export default function CalendarSelector({ doctor, selectedDate, onSelectDate }: CalendarSelectorProps) {
  // Generate the next 14 days starting from today
  const calendarDays = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      
      const fullDate = d.toISOString().split("T")[0]; // YYYY-MM-DD
      const fullDayName = d.toLocaleDateString("en-US", { weekday: "long" }); // e.g., "Sunday"
      const shortDayName = d.toLocaleDateString("en-US", { weekday: "short" }); // e.g., "Sun"
      
      // Check if this specific day exists in the doctor's weekly configuration
      const isAvailable = doctor.weeklySlots.some((slot) => slot.day === fullDayName);

      return {
        fullDate,
        dayNum: d.getDate(),
        shortDayName,
        isAvailable
      };
    });
  }, [doctor.weeklySlots]);

  // Auto-select the first available valid date on load
  useEffect(() => {
    if (!selectedDate) {
      const firstAvailable = calendarDays.find(d => d.isAvailable);
      if (firstAvailable) {
        onSelectDate(firstAvailable.fullDate);
      }
    }
  }, [calendarDays, selectedDate, onSelectDate]);

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-black text-slate-700 uppercase tracking-tight">Select Date</h3>
      
      {/* 1. Changed to grid grid-cols-7 to wrap perfectly without scrolling */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day) => {
          const isSelected = selectedDate === day.fullDate;

          return (
            <button
              key={day.fullDate}
              type="button"
              disabled={!day.isAvailable}
              onClick={() => onSelectDate(day.fullDate)}
              // 2. Removed 'snap-start', adjusted padding and border radius for the grid
              className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border transition-all ${
                !day.isAvailable
                  ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed opacity-60"
                  : isSelected
                  ? "bg-brand-primary border-brand-primary text-white font-black shadow-md scale-105"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
              }`}
            >
              <span className="text-sm leading-none font-black">{day.dayNum}</span>
              <span className="text-[9px] font-bold uppercase pt-1.5 opacity-90">{day.shortDayName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}