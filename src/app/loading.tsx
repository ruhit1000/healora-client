import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col items-center justify-center p-4 font-sans animate-fade-in">
      <div className="flex flex-col items-center space-y-4">

        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-slate-200 rounded-full" />
          <div className="absolute inset-0 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
        </div>

        <div className="text-center space-y-1">
          <p className="text-xs font-bold text-neutral-text tracking-tight">
            Loading secure session...
          </p>
          <p className="text-[10px] text-slate-400 font-medium animate-pulse">
            Connecting with Healora scheduling engine
          </p>
        </div>

      </div>
    </div>
  );
}