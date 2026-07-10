import Navbar from "@/components/shared/Navbar";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      {/* Sticky or Fixed Navigation Bar */}
      <Navbar />

      <main className="grow w-full">
        {children}
      </main>

      {/* Fully functional universal footer */}
      {/* <Footer /> */}
    </div>
  );
}