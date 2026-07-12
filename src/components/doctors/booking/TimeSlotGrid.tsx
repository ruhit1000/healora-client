"use client";

import React, { useMemo } from "react";
import { DetailedDoctorSchema } from "@/lib/api/doctors";

interface TimeSlotGridProps {
  doctor: DetailedDoctorSchema;
  selectedDate: string | null;
  selectedTimeSlot: string | null;
  onSelectTimeSlot: (time: string) => void;
}

// Utility to format raw minutes into 12-hour AM/PM format
const formatAMPM = (totalMinutes: number): string => {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.floor(totalMinutes % 60);
  const ampm = h >= 12 ? "PM" : "AM";
  const formattedH = h % 12 || 12;
  const formattedM = m < 10 ? `0${m}` : m;
  return `${formattedH}:${formattedM} ${ampm}`;
};

export default function TimeSlotGrid({ doctor, selectedDate, selectedTimeSlot, onSelectTimeSlot }: TimeSlotGridProps) {
  const generatedSlots = useMemo(() => {
    if (!selectedDate) return [];

    // Parse the selected string ("YYYY-MM-DD") back to a Date to find the day name
    const dateObj = new Date(selectedDate);
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    // Find the exact schedule rule for this day
    const scheduleRule = doctor.weeklySlots.find((slot) => slot.day === dayName);
    if (!scheduleRule) return [];

    // 1. Convert DB time (HH:MM) into raw minutes
    const [startH, startM] = scheduleRule.startTime.split(":").map(Number);
    const [endH, endM] = scheduleRule.endTime.split(":").map(Number);
    
    const totalStartMins = startH * 60 + startM;
    const totalEndMins = endH * 60 + endM;
    
    // 2. The Core Math: Total Duration / Allowed Patients
    const durationMins = totalEndMins - totalStartMins;
    const intervalMins = durationMins / scheduleRule.maxPatientsAllowed;

    // 3. Loop and build the slots
    const slots: string[] = [];
    for (let i = 0; i < scheduleRule.maxPatientsAllowed; i++) {
      const currentSlotMins = totalStartMins + (i * intervalMins);
      slots.push(formatAMPM(currentSlotMins));
    }

    return slots;
  }, [selectedDate, doctor.weeklySlots]);

  if (!selectedDate) return null;

  return (
    <div className="space-y-4 animate-fadeIn">
      <h3 className="text-xs font-black text-slate-700 uppercase tracking-tight">Select Time</h3>
      
      {generatedSlots.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-xs font-semibold bg-slate-50 rounded-xl border border-dashed border-slate-200">
          No slots mapped for this timeframe.
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {generatedSlots.map((time) => {
            const isSelected = selectedTimeSlot === time;
            
            return (
              <button
                key={time}
                type="button"
                onClick={() => onSelectTimeSlot(time)}
                className={`py-3 px-2 border rounded-xl text-center text-xs transition-all ${
                  isSelected
                    ? "bg-brand-primary/10 border-brand-primary text-brand-primary font-black shadow-sm ring-1 ring-brand-primary/20"
                    : "bg-white border-slate-200 text-slate-600 font-bold hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}