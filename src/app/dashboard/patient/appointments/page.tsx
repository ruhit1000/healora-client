"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getPatientAppointments, AppointmentDocument } from "@/lib/api/appointments";
import { FiCalendar, FiClock, FiUser, FiVideo, FiAlertCircle } from "react-icons/fi";
import BeatLoader from "react-spinners/BeatLoader";

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<{
        confirmed: AppointmentDocument[];
        pending: AppointmentDocument[];
    } | null>(null);

    const [activeTab, setActiveTab] = useState<"confirmed" | "pending">("confirmed");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAppointments = async () => {
            try {
                const data = await getPatientAppointments();
                if (data) {
                    setAppointments(data);
                }
            } catch (error) {
                console.error("Failed to load patient appointments:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAppointments();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
                <BeatLoader color="var(--brand-primary, #0f62fe)" size={12} speedMultiplier={0.8} />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Syncing schedules...</p>
            </div>
        );
    }

    const activeList = activeTab === "confirmed" ? appointments?.confirmed || [] : appointments?.pending || [];

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Appointments</h1>
                <p className="text-sm text-slate-500 font-medium mt-1">
                    Manage your upcoming scheduled consultations and pending checkouts.
                </p>
            </div>

            {/* Tabs Control Panel */}
            <div className="flex border-b border-slate-200">
                <button
                    onClick={() => setActiveTab("confirmed")}
                    className={`px-6 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-colors relative ${activeTab === "confirmed"
                            ? "border-brand-primary text-brand-primary"
                            : "border-transparent text-slate-400 hover:text-slate-600"
                        }`}
                >
                    Active Bookings ({appointments?.confirmed.length || 0})
                </button>
                <button
                    onClick={() => setActiveTab("pending")}
                    className={`px-6 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-colors relative ${activeTab === "pending"
                            ? "border-brand-primary text-brand-primary"
                            : "border-transparent text-slate-400 hover:text-slate-600"
                        }`}
                >
                    Pending Hold ({appointments?.pending.length || 0})
                </button>
            </div>

            {/* Grid of Appointment Cards */}
            {activeList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeList.map((appt) => (
                        <div
                            key={appt._id}
                            className={`bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${activeTab === "confirmed" ? "border-slate-200" : "border-amber-200 bg-amber-50/10"
                                }`}
                        >
                            {/* Card Header: Doctor Info */}
                            <div className="space-y-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-slate-100 rounded-xl overflow-hidden shrink-0 relative border border-slate-200">
                                            {appt.doctorDetails?.image ? (
                                                <Image
                                                    src={appt.doctorDetails.image}
                                                    alt={appt.doctorDetails.name || "Doctor"}
                                                    fill
                                                    sizes="56px"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                                    <FiUser className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-slate-900 text-base">
                                                {appt.doctorDetails?.name || "Medical Expert"}
                                            </h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">
                                                {appt.doctorDetails?.specialty || "Specialist"}
                                            </p>
                                        </div>
                                    </div>

                                    <span
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 ${appt.bookingStatus === "Confirmed"
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-amber-100 text-amber-700"
                                            }`}
                                    >
                                        {appt.bookingStatus}
                                    </span>
                                </div>

                                {/* Timing Matrix */}
                                <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 py-3 text-xs font-bold text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <FiCalendar className="w-4 h-4 text-brand-primary" />
                                        <span>{appt.appointmentDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FiClock className="w-4 h-4 text-brand-primary" />
                                        <span>{appt.appointmentTime}</span>
                                    </div>
                                </div>

                                {/* Intake Information */}
                                <div className="space-y-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                                        Patient Intake Context
                                    </p>
                                    <p className="text-xs font-black text-slate-800">
                                        {appt.patientDetails.patientName} ({appt.patientDetails.age} yrs • {appt.patientDetails.gender})
                                    </p>
                                    <p className="text-xs font-medium text-slate-500 truncate mt-0.5">
                                        Reason: {appt.patientDetails.reasonForVisit || "Routine Clinical Assessment"}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons Interface */}
                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                                {activeTab === "confirmed" ? (
                                    <>
                                        <button className="flex-1 py-3 bg-brand-primary text-white text-xs font-black rounded-xl transition-colors hover:bg-brand-primary/95 flex items-center justify-center gap-2 shadow-sm">
                                            <FiVideo className="w-4 h-4" />
                                            Enter Telemedicine
                                        </button>
                                        <button className="px-4 py-3 bg-slate-50 border border-slate-200 text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-xs font-bold rounded-xl transition-colors">
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <div className="w-full flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded-xl p-3">
                                        <FiAlertCircle className="w-4 h-4 shrink-0" />
                                        <span>Complete payment sequence to lock your schedule.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-2xl py-16 text-center max-w-xl mx-auto space-y-2">
                    <p className="text-sm font-black text-slate-800">No appointments mapped here</p>
                    <p className="text-xs font-medium text-slate-400">
                        {activeTab === "confirmed"
                            ? "You do not have any active or upcoming medical schedules."
                            : "There are no pending checkout holds waiting for confirmations."}
                    </p>
                </div>
            )}
        </div>
    );
}