"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { dashboardPathForRole, normalizeRole } from "@/lib/roles";
import { getPatientOverview, DashboardOverviewData } from "@/lib/api/overview";
import { FiCalendar, FiCheckCircle, FiDollarSign, FiClock, FiUser, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import { BeatLoader } from "react-spinners";

export default function PatientDashboardPage() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = useSession();

  // Dashboard state management
  const [overviewData, setOverviewData] = useState<DashboardOverviewData | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // 1. Role Verification & Route Guarding
  useEffect(() => {
    if (isSessionPending) return;

    if (!session?.user) {
      router.replace("/login");
      return;
    }

    const role = normalizeRole((session.user as { role?: unknown }).role);
    if (role !== "patient") {
      router.replace(dashboardPathForRole(role));
    }
  }, [isSessionPending, router, session]);

  // 2. Fetch Aggregated Overview Payload
  useEffect(() => {
    if (!session?.user) return;

    const loadDashboardData = async () => {
      try {
        const data = await getPatientOverview();
        setOverviewData(data);
      } catch (err) {
        console.error("Failed to compile dashboard state:", err);
      } finally {
        setIsDataLoading(false);
      }
    };

    loadDashboardData();
  }, [session]);

  // Handle global loading states cleanly
  if (isSessionPending || isDataLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <BeatLoader color="var(--brand-primary, #0f62fe)" size={12} speedMultiplier={0.8} />
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Syncing your health profile...</p>
    </div>
    );
  }

  const stats = overviewData?.stats || { upcomingCount: 0, completedCount: 0, totalSpent: 0 };
  const nextAppt = overviewData?.nextAppointment;
  const recentActivity = overviewData?.recentActivity || [];

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* HEADER WELCOME BANNER */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Hello, {session?.user?.name || "Patient"}
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Welcome back. Here is a snapshot of your current medical schedule and records.
        </p>
      </div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Card 1: Upcoming */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upcoming Visits</p>
            <p className="text-3xl font-black text-slate-900">{stats.upcomingCount}</p>
          </div>
          <div className="p-4 rounded-xl bg-blue-50 text-blue-600">
            <FiCalendar className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Completed */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Consultations</p>
            <p className="text-3xl font-black text-slate-900">{stats.completedCount}</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 text-emerald-600">
            <FiCheckCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Total Financial Pipeline */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Invested</p>
            <p className="text-3xl font-black text-slate-900">৳{stats.totalSpent.toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-xl bg-purple-50 text-purple-600">
            <FiDollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* PRIMARY DASHBOARD ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* LEFT COLUMN: UPCOMING APPOINTMENT FOCUS ELEMENT */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">Next Appointment</h2>

          {nextAppt ? (
            <div className="bg-white border-2 border-brand-primary shadow-md rounded-2xl p-6 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                Confirmed
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden shrink-0 relative">
                  {nextAppt.doctorDetails?.image ? (
                    <Image
                      src={nextAppt.doctorDetails.image}
                      alt={nextAppt.doctorDetails.name || "Doctor"}
                      fill
                      sizes="48px"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                      <FiUser className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-base">{nextAppt.doctorDetails?.name || "Medical Expert"}</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">{nextAppt.doctorDetails?.specialty}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-3">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                  <FiCalendar className="w-4 h-4 text-brand-primary" />
                  <span>{nextAppt.appointmentDate}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                  <FiClock className="w-4 h-4 text-brand-primary" />
                  <span>{nextAppt.appointmentTime}</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Reason for visit</p>
                <p className="text-xs font-bold text-slate-700 mt-1 truncate">
                  {nextAppt.patientDetails?.reasonForVisit || "Routine Health Evaluation Check"}
                </p>
              </div>

              <button className="w-full py-3 bg-brand-primary text-white text-xs font-black rounded-xl transition-all hover:bg-brand-primary/95 shadow-sm">
                Enter Telemedicine Chamber
              </button>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-8 text-center space-y-4">
              <p className="text-xs font-bold text-slate-400 leading-relaxed">You have no active or scheduled doctor visits mapped at the moment.</p>
              <Link href="/doctors" className="inline-flex items-center gap-2 text-xs font-black text-brand-primary hover:underline">
                Find a Doctor <FiArrowRight />
              </Link>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: RECENT HISTORY MATRIX LOGS */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">Recent Activity Logs</h2>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            {recentActivity.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold text-xs">
                      <th className="px-6 py-4 text-left font-black">Practitioner / Specialist</th>
                      <th className="px-6 py-4 text-left font-black">Schedule Window</th>
                      <th className="px-6 py-4 text-left font-black">Status</th>
                      <th className="px-6 py-4 text-right font-black">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                    {recentActivity.map((activity) => (
                      <tr key={activity._id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-4 text-left whitespace-nowrap">
                          <div>
                            <p className="font-black text-slate-900">{activity.doctorDetails?.name || "Medical Professional"}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight mt-1">{activity.doctorDetails?.specialty}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-left whitespace-nowrap">
                          <p className="text-slate-900">{activity.appointmentDate}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{activity.appointmentTime}</p>
                        </td>
                        <td className="px-6 py-4 text-left whitespace-nowrap">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${activity.bookingStatus === "Completed"
                              ? "bg-emerald-50 text-emerald-600"
                              : activity.bookingStatus === "Locked"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-rose-50 text-rose-600"
                            }`}>
                            {activity.bookingStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap font-black text-slate-900">
                          ৳{activity.consultationFee.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-xs font-bold text-slate-400">
                No archived session metrics or timeline logs found.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}