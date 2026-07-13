"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { normalizeRole } from "@/lib/roles";

// Clean, unified icons from react-icons
import { FiHome, FiCalendar, FiPieChart, FiUser, FiShield, FiSettings } from "react-icons/fi";

// --- Role-Based Navigation Configuration ---
const navConfig = {
  patient: [
    { name: "Overview", href: "/dashboard/patient", icon: FiHome },
    { name: "Appointments", href: "/dashboard/patient/appointments", icon: FiCalendar },
    { name: "History", href: "/dashboard/patient/history", icon: FiPieChart },
    { name: "Profile", href: "/dashboard/patient/profile", icon: FiUser },
  ],
  doctor: [
    { name: "Today", href: "/dashboard/doctor", icon: FiHome },
    { name: "Schedule", href: "/dashboard/doctor/schedule", icon: FiCalendar },
    { name: "Earnings", href: "/dashboard/doctor/financials", icon: FiPieChart },
    { name: "Profile", href: "/dashboard/doctor/profile", icon: FiUser },
  ],
  admin: [
    { name: "Overview", href: "/dashboard/admin", icon: FiHome },
    { name: "Verify Doctors", href: "/dashboard/admin/verifications", icon: FiShield },
    { name: "All Bookings", href: "/dashboard/admin/bookings", icon: FiCalendar },
    { name: "Users", href: "/dashboard/admin/users", icon: FiUser },
  ],
};

export default function DashboardNavigation() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  // Show a blank/loading state for the nav while checking session
  if (isPending) return null;

  // Safely extract and normalize the user's role
  const rawRole = (session?.user as { role?: unknown })?.role;
  const role = normalizeRole(rawRole) as keyof typeof navConfig;
  const links = navConfig[role] || navConfig.patient; 

  return (
    <>
      {/* ==========================================
          DESKTOP SIDEBAR (Hidden on Mobile)
          ========================================== */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-20">
        <div className="p-6 border-b border-slate-100">
          <Link href="/" className="text-2xl font-black text-brand-primary tracking-tight">
            Healora.
          </Link>
          <p className="text-xs font-bold text-slate-400 capitalize mt-1">{role} Portal</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                  isActive 
                    ? "bg-brand-primary text-white shadow-md" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors">
            <FiSettings className="w-5 h-5" />
            Back to Website
          </Link>
        </div>
      </aside>

      {/* ==========================================
          MOBILE BOTTOM NAV (Hidden on Desktop)
          ========================================== */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 z-50 pb-safe">
        <div className="flex justify-around items-center p-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col items-center justify-center w-full p-2 gap-1 rounded-lg transition-colors ${
                  isActive ? "text-brand-primary" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-bold">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}