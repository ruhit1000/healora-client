import React from "react";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* Renders Desktop Sidebar & Mobile Bottom Nav */}
      <DashboardNavigation />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}