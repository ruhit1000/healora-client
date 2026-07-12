"use client";

import React, { useMemo, useState, useEffect } from "react";
import { DetailedDoctorSchema } from "@/lib/api/doctors";
import { getBookedSlots } from "@/lib/api/booking";

interface TimeSlotGridProps {
  doctor: DetailedDoctorSchema;
  selectedDate: string | null;
  selectedTimeSlot: string | null;
  onSelectTimeSlot: (time: string) => void;
}

const formatAMPM = (totalMinutes: number): string => {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.floor(totalMinutes % 60);
  const ampm = h >= 12 ? "PM" : "AM";
  const formattedH = h % 12 || 12;
  const formattedM = m < 10 ? `0${m}` : m;
  return `${formattedH}:${formattedM} ${ampm}`;
};

export default function TimeSlotGrid({ doctor, selectedDate, selectedTimeSlot, onSelectTimeSlot }: TimeSlotGridProps) {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // 2. The Cleaned-Up useEffect
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate) return;
      
      setIsLoadingSlots(true);
      // Call your abstracted function
      const slots = await getBookedSlots(doctor._id, selectedDate);
      setBookedSlots(slots);
      setIsLoadingSlots(false);
    };

    fetchSlots();
  }, [selectedDate, doctor._id]);

  const generatedSlots = useMemo(() => {
    if (!selectedDate) return [];

    const dateObj = new Date(selectedDate);
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    const scheduleRule = doctor.weeklySlots.find((slot) => slot.day === dayName);
    if (!scheduleRule) return [];

    const [startH, startM] = scheduleRule.startTime.split(":").map(Number);
    const [endH, endM] = scheduleRule.endTime.split(":").map(Number);
    
    const totalStartMins = startH * 60 + startM;
    const totalEndMins = endH * 60 + endM;
    
    const durationMins = totalEndMins - totalStartMins;
    const intervalMins = durationMins / scheduleRule.maxPatientsAllowed;

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
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-black text-slate-700 uppercase tracking-tight">Select Time</h3>
        {isLoadingSlots && (
          <span className="text-[10px] text-brand-primary font-bold animate-pulse">Syncing...</span>
        )}
      </div>
      
      {generatedSlots.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-xs font-semibold bg-slate-50 rounded-xl border border-dashed border-slate-200">
          No slots mapped for this timeframe.
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {generatedSlots.map((time) => {
            const isSelected = selectedTimeSlot === time;
            // NEW: Check if this time exists in the disabled array from the backend
            const isBooked = bookedSlots.includes(time);
            
            return (
              <button
                key={time}
                type="button"
                disabled={isBooked}
                onClick={() => onSelectTimeSlot(time)}
                className={`py-3 px-2 border rounded-xl text-center text-xs transition-all ${
                  isBooked
                    ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed line-through opacity-70"
                    : isSelected
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