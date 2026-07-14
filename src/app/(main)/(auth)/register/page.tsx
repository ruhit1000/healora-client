"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signUp, useSession } from "@/lib/auth-client";

function RegisterForm() {
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending: isSessionPending } = useSession();

  // Capture the redirect parameter, default to the homepage "/"
  const redirectUrl = searchParams.get("callbackUrl") || "/";
  const loginUrl = `/login${redirectUrl !== "/" ? `?callbackUrl=${encodeURIComponent(redirectUrl)}` : ""}`;

  useEffect(() => {
    if (!isSessionPending && session?.user) {
      router.replace(redirectUrl);
    }
  }, [isSessionPending, router, session, redirectUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    const { error } = await signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role,
    } as Parameters<typeof signUp.email>[0] & { role: "patient" | "doctor" });

    if (error) {
      setErrorMessage(error.message || "Could not create your account. Please try again.");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-white border border-slate-100 p-8 rounded-healora shadow-md max-w-sm w-full text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-neutral-text tracking-tight">Account Created!</h2>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          Your {role} account has been structured successfully. You can now log in.
        </p>
        <div className="pt-2">
          <Link
            href={loginUrl}
            className="block w-full py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-bold rounded-healora transition-all shadow-xs"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-100 p-8 rounded-healora shadow-md max-w-md w-full space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-black text-neutral-text tracking-tight">Create Your Account</h1>
        <p className="text-xs text-slate-500 font-medium">Join Healora to manage appointments instantly</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 block">I want to sign up as a:</label>
        <div className="relative grid grid-cols-2 bg-slate-100 p-1 rounded-healora border border-slate-200/40 select-none overflow-hidden">
          <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-in-out ${role === "doctor" ? "translate-x-[calc(100%+4px)]" : "translate-x-1"}`} />
          <button type="button" onClick={() => setRole("patient")} className={`relative z-10 py-2 text-xs font-bold text-center transition-colors duration-300 cursor-pointer ${role === "patient" ? "text-brand-primary" : "text-slate-500 hover:text-slate-800"}`}>Patient</button>
          <button type="button" onClick={() => setRole("doctor")} className={`relative z-10 py-2 text-xs font-bold text-center transition-colors duration-300 cursor-pointer ${role === "doctor" ? "text-brand-accent" : "text-slate-500 hover:text-slate-800"}`}>Doctor</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Full Name</label>
          <input type="text" name="name" required disabled={isLoading} value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-healora text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-medium" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Email Address</label>
          <input type="email" name="email" required disabled={isLoading} value={formData.email} onChange={handleChange} placeholder="name@example.com" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-healora text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-medium" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Password</label>
          <input type="password" name="password" required disabled={isLoading} value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-healora text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-medium" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Confirm Password</label>
          <input type="password" name="confirmPassword" required disabled={isLoading} value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-healora text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-medium" />
        </div>

        {errorMessage && <p className="text-[11px] font-semibold text-red-600 bg-red-50 border border-red-100 rounded-healora px-3 py-2">{errorMessage}</p>}

        <button type="submit" disabled={isLoading} className={`w-full py-3 text-white font-bold text-xs rounded-healora transition-all shadow-sm hover:shadow-md cursor-pointer text-center ${role === "doctor" ? "bg-brand-accent hover:bg-brand-accent/90" : "bg-brand-primary hover:bg-brand-primary/90"}`}>
          {isLoading ? "Creating Account..." : "Register Account"}
        </button>
      </form>

      <div className="text-center pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-400">
        Already have a Healora account?{" "}
        <Link href={loginUrl} className="text-brand-primary hover:underline font-bold">
          Sign In here
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <Suspense fallback={<div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}