"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getPatientHistory } from "@/lib/api/history";
import { AppointmentDocument } from "@/lib/api/appointments";
import { BeatLoader } from "react-spinners";
import { FiCalendar, FiClock, FiUser, FiActivity, FiDownload, FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function PatientHistoryPage() {
  const [history, setHistory] = useState<AppointmentDocument[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getPatientHistory();
        if (data) setHistory(data);
      } catch (error) {
        console.error("Failed to load clinical history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <BeatLoader color="var(--brand-primary, #0f62fe)" size={12} speedMultiplier={0.8} />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Compiling medical archive...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Consultation History</h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Review your past appointments, treatment timelines, and payment summaries.
        </p>
      </div>

      {/* Main Table Content */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {history && history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold text-xs">
                  <th className="px-6 py-4 text-left font-black">Practitioner</th>
                  <th className="px-6 py-4 text-left font-black">Date & Time</th>
                  <th className="px-6 py-4 text-left font-black">Reason for Visit</th>
                  <th className="px-6 py-4 text-left font-black">Status</th>
                  <th className="px-6 py-4 text-right font-black">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                {history.map((record) => (
                  <tr key={record._id} className="hover:bg-slate-50/70 transition-colors">
                    
                    {/* Practitioner Cell */}
                    <td className="px-6 py-4 text-left whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl overflow-hidden shrink-0 relative border border-slate-200">
                          {record.doctorDetails?.image ? (
                            <Image
                              src={record.doctorDetails.image}
                              alt={record.doctorDetails.name || "Doctor"}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                              <FiUser className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-black text-slate-900">{record.doctorDetails?.name || "Medical Expert"}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight mt-0.5">{record.doctorDetails?.specialty}</p>
                        </div>
                      </div>
                    </td>

                    {/* Schedule Cell */}
                    <td className="px-6 py-4 text-left whitespace-nowrap">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 text-slate-900">
                          <FiCalendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{record.appointmentDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                          <FiClock className="w-3.5 h-3.5" />
                          <span>{record.appointmentTime}</span>
                        </div>
                      </div>
                    </td>

                    {/* Reason/Intake Context */}
                    <td className="px-6 py-4 text-left max-w-xs truncate font-medium text-slate-600">
                      {record.patientDetails?.reasonForVisit || "Routine Health Screening Evaluation"}
                    </td>

                    {/* Status Pill */}
                    <td className="px-6 py-4 text-left whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        record.bookingStatus === "Completed" 
                          ? "bg-emerald-50 text-emerald-600" 
                          : "bg-rose-50 text-rose-600"
                      }`}>
                        {record.bookingStatus === "Completed" ? <FiCheckCircle /> : <FiXCircle />}
                        {record.bookingStatus}
                      </span>
                    </td>

                    {/* Receipt Details and Download Action */}
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-3">
                        <span className="font-black text-slate-900">৳{record.consultationFee.toLocaleString()}</span>
                        {record.paymentStatus === "Paid" && (
                          <button 
                            title="Download Receipt"
                            className="p-2 text-slate-400 hover:text-brand-primary bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                          >
                            <FiDownload className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 px-4 space-y-3">
            <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 mx-auto">
              <FiActivity className="w-6 h-6" />
            </div>
            <p className="text-sm font-black text-slate-800">No archival logs found</p>
            <p className="text-xs font-medium text-slate-400 max-w-xs mx-auto">
              You do not have any historical or completed clinical timeline consultation records logged yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}