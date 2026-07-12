import React from "react";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function BookingSuccessPage({ searchParams }: PageProps) {

  const resolvedParams = await searchParams;
  const sessionId = resolvedParams.session_id;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center space-y-6 border border-slate-100">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Booking Confirmed!</h1>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Your appointment has been successfully scheduled and your payment is complete. 
          </p>
          {/* Using the searchParams variable here fixes the unused variable error */}
          {sessionId && (
            <p className="text-[10px] text-slate-400 font-mono pt-1">
              Ref: {sessionId}
            </p>
          )}
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left space-y-2">
          <p className="text-xs font-bold text-slate-700">What happens next?</p>
          <ul className="text-xs text-slate-500 space-y-1.5 font-medium list-disc list-inside">
            <li>You will receive a confirmation email shortly.</li>
            <li>Please arrive 10 minutes before your scheduled time.</li>
            <li>Bring any previous medical records if applicable.</li>
          </ul>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="flex items-center justify-center w-full bg-slate-800 text-white font-black text-sm py-5 rounded-xl shadow-md hover:bg-slate-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
        
      </div>
    </div>
  );
}