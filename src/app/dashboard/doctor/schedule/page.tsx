"use client";

import React, { useEffect, useState } from "react";
import { getDoctorProfile } from "@/lib/api/doctorProfile";
import { updateDoctorSchedule, WeeklySlot } from "@/lib/api/doctorSchedule";
import { BeatLoader } from "react-spinners";
import { Card, Button, Switch } from "@heroui/react";
import { FiClock, FiUsers, FiTrash2, FiPlus, FiSave, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type ScheduleMap = Record<string, { isActive: boolean; slots: Omit<WeeklySlot, "day">[] }>;

export default function DoctorsSchedulePage() {
    const [scheduleMap, setScheduleMap] = useState<ScheduleMap>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

    // 1. Fetch & Transform Data
    useEffect(() => {
        const loadSchedule = async () => {
            try {
                const profile = await getDoctorProfile();

                // Initialize an empty map for all 7 days
                const initialMap: ScheduleMap = DAYS_OF_WEEK.reduce((acc, day) => {
                    acc[day] = { isActive: false, slots: [] };
                    return acc;
                }, {} as ScheduleMap);

                // Populate map with existing slots from the backend
                if (profile?.weeklySlots && Array.isArray(profile.weeklySlots)) {
                    profile.weeklySlots.forEach((slot) => {
                        if (initialMap[slot.day]) {
                            initialMap[slot.day].isActive = true;
                            initialMap[slot.day].slots.push({
                                startTime: slot.startTime,
                                endTime: slot.endTime,
                                maxPatientsAllowed: slot.maxPatientsAllowed,
                            });
                        }
                    });
                }

                setScheduleMap(initialMap);
            } catch (error) {
                console.error("Failed to load schedule", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadSchedule();
    }, []);

    // 2. Handlers for Schedule Operations
    const handleToggleDay = (day: string, isActive: boolean) => {
        setScheduleMap((prev) => {
            const updatedDay = { ...prev[day], isActive };
            // Auto-inject a default time block if turning ON and currently empty
            if (isActive && updatedDay.slots.length === 0) {
                updatedDay.slots = [{ startTime: "09:00", endTime: "17:00", maxPatientsAllowed: 15 }];
            }
            return { ...prev, [day]: updatedDay };
        });
    };

    const handleAddBlock = (day: string) => {
        setScheduleMap((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                slots: [...prev[day].slots, { startTime: "09:00", endTime: "13:00", maxPatientsAllowed: 10 }],
            },
        }));
    };

    const handleRemoveBlock = (day: string, slotIndex: number) => {
        setScheduleMap((prev) => {
            const newSlots = prev[day].slots.filter((_, idx) => idx !== slotIndex);
            // Auto-toggle off if no slots remain
            return {
                ...prev,
                [day]: { isActive: newSlots.length > 0, slots: newSlots },
            };
        });
    };

    const handleUpdateBlock = (day: string, slotIndex: number, field: keyof Omit<WeeklySlot, "day">, value: string | number) => {
        setScheduleMap((prev) => {
            const newSlots = [...prev[day].slots];
            newSlots[slotIndex] = { ...newSlots[slotIndex], [field]: value };
            return { ...prev, [day]: { ...prev[day], slots: newSlots } };
        });
    };

    // 3. Save Configuration back to Backend
    const handleSave = async () => {
        setIsSaving(true);
        setAlert(null);

        // Flatten map back into WeeklySlot[]
        const payload: WeeklySlot[] = [];
        DAYS_OF_WEEK.forEach((day) => {
            if (scheduleMap[day].isActive) {
                scheduleMap[day].slots.forEach((slot) => {
                    payload.push({
                        day,
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                        maxPatientsAllowed: Number(slot.maxPatientsAllowed),
                    });
                });
            }
        });

        const success = await updateDoctorSchedule(payload);
        if (success) {
            setAlert({ type: "success", message: "Schedule rules securely synchronized." });
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            setAlert({ type: "error", message: "Failed to save schedule. Please try again." });
        }

        setIsSaving(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <BeatLoader color="var(--brand-primary, #0f62fe)" size={10} speedMultiplier={0.8} />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Syncing Schedule Roster...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-fadeIn">

            {/* Dynamic Header Notification */}
            {alert && (
                <div className={`p-4 rounded-xl text-xs font-bold border flex items-center gap-2 ${alert.type === "success" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}>
                    {alert.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
                    <span>{alert.message}</span>
                </div>
            )}

            {/* Action Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-5 gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Availability & Rosters</h1>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">Define standard weekly appointment limits and operational hours.</p>
                </div>
                <Button
                    variant="primary"
                    onClick={handleSave}
                    isDisabled={isSaving}
                    className="bg-brand-primary text-white text-xs font-black uppercase tracking-wider px-6 h-10 rounded-xl"
                >
                    {isSaving ? "Saving..." : <><FiSave className="mr-2" /> Save Rules</>}
                </Button>
            </div>

            {/* Days List */}
            <div className="space-y-4">
                {DAYS_OF_WEEK.map((day) => {
                    const dayData = scheduleMap[day];
                    if (!dayData) return null;

                    return (
                        <Card key={day} className={`border rounded-2xl shadow-none transition-all ${dayData.isActive ? "border-brand-primary/40 bg-white" : "border-slate-200 bg-slate-50/50"}`}>
                            <div className="p-5">

                                {/* Day Header & Toggle */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Switch
                                            isSelected={dayData.isActive}
                                            onChange={(isSelected) => handleToggleDay(day, isSelected)}
                                            aria-label={`Toggle availability for ${day}`}
                                        >
                                            <Switch.Content>
                                                <Switch.Control>
                                                    <Switch.Thumb />
                                                </Switch.Control>
                                            </Switch.Content>
                                        </Switch>
                                        <h3 className={`text-sm font-black uppercase tracking-wider ${dayData.isActive ? "text-slate-900" : "text-slate-400"}`}>
                                            {day}
                                        </h3>
                                    </div>
                                    {!dayData.isActive && (
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unavailable</span>
                                    )}
                                </div>

                                {/* Time Blocks Array */}
                                {dayData.isActive && (
                                    <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
                                        {dayData.slots.map((slot, index) => (
                                            <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-50/50 p-3 rounded-xl border border-slate-100">

                                                {/* Time Inputs */}
                                                <div className="flex items-center gap-3 flex-1">
                                                    <FiClock className="text-slate-400 w-4 h-4 hidden sm:block" />
                                                    <input
                                                        type="time"
                                                        value={slot.startTime}
                                                        onChange={(e) => handleUpdateBlock(day, index, "startTime", e.target.value)}
                                                        className="input input-sm input-bordered w-full text-xs font-bold rounded-lg focus:outline-none focus:border-brand-primary"
                                                    />
                                                    <span className="text-xs font-bold text-slate-400">to</span>
                                                    <input
                                                        type="time"
                                                        value={slot.endTime}
                                                        onChange={(e) => handleUpdateBlock(day, index, "endTime", e.target.value)}
                                                        className="input input-sm input-bordered w-full text-xs font-bold rounded-lg focus:outline-none focus:border-brand-primary"
                                                    />
                                                </div>

                                                {/* Limit & Delete */}
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <FiUsers className="text-slate-400 w-4 h-4 hidden sm:block" />
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap">Max:</label>
                                                        <input
                                                            type="number"
                                                            min={1}
                                                            value={slot.maxPatientsAllowed}
                                                            onChange={(e) => handleUpdateBlock(day, index, "maxPatientsAllowed", Number(e.target.value))}
                                                            className="input input-sm input-bordered w-16 text-xs font-bold rounded-lg focus:outline-none focus:border-brand-primary text-center"
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveBlock(day, index)}
                                                        className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                        title="Remove block"
                                                    >
                                                        <FiTrash2 className="w-4 h-4" />
                                                    </button>
                                                </div>

                                            </div>
                                        ))}

                                        {/* Add New Block Trigger */}
                                        <button
                                            onClick={() => handleAddBlock(day)}
                                            className="text-[10px] font-black uppercase tracking-wider text-brand-primary hover:text-brand-primary/80 flex items-center gap-1 mt-2 transition-colors"
                                        >
                                            <FiPlus /> Add another time block
                                        </button>
                                    </div>
                                )}

                            </div>
                        </Card>
                    );
                })}
            </div>

        </div>
    );
}