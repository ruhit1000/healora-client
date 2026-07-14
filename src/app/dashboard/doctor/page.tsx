"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { dashboardPathForRole, normalizeRole } from "@/lib/roles";
import { getDoctorOverview, DoctorDashboardData } from "@/lib/api/doctorOverview";
import { BeatLoader } from "react-spinners";
import {
  Card,
  Button,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@heroui/react";
import { CircleFill } from "@gravity-ui/icons";
import { FiCalendar, FiCheckCircle, FiDollarSign, FiVideo, FiAlertOctagon, FiClock } from "react-icons/fi";
import Link from "next/link";

export default function DoctorDashboardPage() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = useSession();

  const [dashboardData, setDashboardData] = useState<DoctorDashboardData | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (isSessionPending) return;

    if (!session?.user) {
      router.replace("/login");
      return;
    }

    const role = normalizeRole((session.user as { role?: unknown }).role);
    if (role !== "doctor") {
      router.replace(dashboardPathForRole(role));
    }
  }, [isSessionPending, router, session]);

  useEffect(() => {
    if (!session?.user) return;

    const loadDoctorDashboard = async () => {
      try {
        const data = await getDoctorOverview();
        if (data) setDashboardData(data);
      } catch (err) {
        console.error("Failed to construct doctor platform data:", err);
      } finally {
        setIsDataLoading(false);
      }
    };

    loadDoctorDashboard();
  }, [session]);

  if (isSessionPending || isDataLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <BeatLoader color="var(--brand-primary, #0f62fe)" size={10} speedMultiplier={0.8} />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Syncing Clinical Registry...</p>
      </div>
    );
  }

  const stats = dashboardData?.stats || { remainingToday: 0, completedToday: 0, earningsToday: 0 };
  const queueList = dashboardData?.queue || [];
  const isApproved = dashboardData?.isApproved ?? false;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-fadeIn">

      {/* HEADER & LIVE VERIFICATION TRACKER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome, Dr. {session?.user?.name || "Practitioner"}
          </h1>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">
            Here is your patient queue tracking ledger for today.
          </p>
        </div>

        <Chip color={isApproved ? "success" : "warning"} variant="primary" className="h-8 border border-slate-200">
          <CircleFill width={6} />
          <Chip.Label>{isApproved ? "Active & Verified" : "Verification Pending"}</Chip.Label>
        </Chip>
      </div>

      {/* UNVERIFIED WARNING BANNER */}
      {!isApproved && (
        <Card className="border border-amber-200 bg-amber-50/40 rounded-2xl shadow-none">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 p-5">
            <div className="flex flex-row items-start gap-4">
              <FiAlertOctagon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-black text-amber-800 uppercase tracking-wider">
                  Credentials Under Audit & Profile Incomplete
                </h4>
                <p className="text-xs font-medium text-amber-700 leading-relaxed max-w-2xl">
                  Your registration files are currently undergoing verification pipelines. To appear in public search registries and fully unlock live online bookings, you must complete your practitioner profile configuration.
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/doctor/profile"
              className="text-xs font-black uppercase tracking-wider text-amber-800 hover:text-amber-950 underline shrink-0 mt-1 sm:mt-0 self-start sm:self-center transition-colors"
            >
              Complete Profile →
            </Link>
          </div>
        </Card>
      )}

      {/* STATISTICAL METRIC LOGS CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="border border-slate-200 rounded-2xl">
          <div className="flex flex-row items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Remaining Today</p>
              <p className="text-2xl font-black text-slate-900">{stats.remainingToday}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-blue-50 text-blue-600">
              <FiCalendar className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="border border-slate-200 rounded-2xl">
          <div className="flex flex-row items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Completed Sessions</p>
              <p className="text-2xl font-black text-slate-900">{stats.completedToday}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-600">
              <FiCheckCircle className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="border border-slate-200 rounded-2xl">
          <div className="flex flex-row items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Today's Revenue</p>
              <p className="text-2xl font-black text-slate-900">৳{stats.earningsToday.toLocaleString()}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-purple-50 text-purple-600">
              <FiDollarSign className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* PATIENT QUEUE OPERATIONAL HUB */}
      <div className="space-y-4">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">Today's Clinical Intake Queue</h2>

        {queueList.length > 0 ? (
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
            <Table aria-label="Clinical Queue Table Matrix">
              <TableHeader>
                <TableColumn className="bg-slate-50 text-slate-400 font-black text-xs px-6 py-4 border-b border-slate-200">Patient Details</TableColumn>
                <TableColumn className="bg-slate-50 text-slate-400 font-black text-xs px-6 py-4 border-b border-slate-200">Time Window</TableColumn>
                <TableColumn className="bg-slate-50 text-slate-400 font-black text-xs px-6 py-4 border-b border-slate-200">Reason / Complaint</TableColumn>
                <TableColumn className="bg-slate-50 text-slate-400 font-black text-xs px-6 py-4 border-b border-slate-200">Booking Status</TableColumn>
                <TableColumn className="bg-slate-50 text-slate-400 font-black text-xs px-6 py-4 border-b border-slate-200 text-right">Actions</TableColumn>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                {queueList.map((appt) => (
                  <TableRow key={appt._id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-b-0">

                    <TableCell className="px-6 py-4">
                      <div>
                        <p className="font-black text-slate-900 text-xs">{appt.patientDetails.patientName}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1">{appt.patientDetails.age} yrs • {appt.patientDetails.gender}</p>
                      </div>
                    </TableCell>

                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-900 font-black">
                        <FiClock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{appt.appointmentTime}</span>
                      </div>
                    </TableCell>

                    <TableCell className="px-6 py-4 max-w-xs font-medium text-slate-500 truncate">
                      {appt.patientDetails.reasonForVisit || "Routine General Assessment"}
                    </TableCell>

                    <TableCell className="px-6 py-4">
                      <Chip
                        color={
                          appt.bookingStatus === "Completed" ? "success" :
                            appt.bookingStatus === "Cancelled" ? "danger" : "default"
                        }
                        variant="soft"
                      >
                        <Chip.Label>{appt.bookingStatus}</Chip.Label>
                      </Chip>
                    </TableCell>

                    <TableCell className="px-6 py-4 text-right">
                      {appt.bookingStatus === "Confirmed" ? (
                        <Button
                          variant="primary"
                          className="text-[10px] font-black uppercase tracking-wider rounded-xl shadow-sm h-9 bg-brand-primary text-white px-4"
                        >
                          <FiVideo className="w-3.5 h-3.5 mr-1 inline" />
                          Launch Chamber
                        </Button>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-bold pr-3 uppercase tracking-wider">
                          Archived / Closed
                        </span>
                      )}
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <Card className="border border-slate-200 border-dashed rounded-2xl py-16">
            <div className="text-center space-y-2 p-6">
              <p className="text-sm font-black text-slate-800">Your queue timeline is empty</p>
              <p className="text-xs font-medium text-slate-400 max-w-xs mx-auto">
                No active or scheduled consultations are mapped to your calendar system today.
              </p>
            </div>
          </Card>
        )}
      </div>

    </div>
  );
}