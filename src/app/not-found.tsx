import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full text-center space-y-6">
        
        <div className="space-y-2">
          <div className="text-sm font-bold text-brand-primary tracking-widest uppercase">
            Error 404
          </div>
          <h1 className="text-3xl font-black text-neutral-text tracking-tight sm:text-4xl">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
            The page you are looking for doesn't exist or has been moved to a new schedule link.
          </p>
        </div>

        <div className="w-12 h-0.5 bg-slate-100 mx-auto rounded-full" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-brand-primary hover:bg-brand-primary/90 rounded-healora shadow-xs transition-all duration-200"
          >
            Go Home
          </Link>
          <Link
            href="/doctors"
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-slate-600 hover:text-neutral-text transition-colors duration-200"
          >
            Browse Doctors &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}