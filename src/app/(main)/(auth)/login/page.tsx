"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "@/lib/auth-client";
import Link from "next/link";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending: isSessionPending } = useSession();

  const redirectUrl = searchParams.get("callbackUrl") || "/";
  const registerUrl = `/register${redirectUrl !== "/" ? `?callbackUrl=${encodeURIComponent(redirectUrl)}` : ""}`;

  useEffect(() => {
    // If the user is already logged in, redirect them
    if (!isSessionPending && session?.user) {
      router.replace(redirectUrl);
    }
  }, [isSessionPending, router, session, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const { error } = await signIn.email({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message || "Invalid login credentials.");
      setIsLoading(false);
      return;
    }

    // Success - Execute redirect
    router.replace(redirectUrl);
  };

  return (
    <div className="bg-white border border-slate-100 p-8 rounded-healora shadow-md max-w-sm w-full space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-black text-neutral-text tracking-tight">Welcome Back</h1>
        <p className="text-xs text-slate-500 font-medium">Log in to manage your appointments</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Email Address</label>
          <input type="email" required disabled={isLoading} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-healora text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-medium" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Password</label>
          <input type="password" required disabled={isLoading} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-healora text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-medium" />
        </div>

        {errorMessage && <p className="text-[11px] font-semibold text-red-600 bg-red-50 border border-red-100 rounded-healora px-3 py-2">{errorMessage}</p>}

        <button type="submit" disabled={isLoading} className="w-full py-3 text-white font-bold text-xs bg-brand-primary hover:bg-brand-primary/90 rounded-healora transition-all shadow-sm">
          {isLoading ? "Authenticating..." : "Sign In"}
        </button>
      </form>

      <div className="text-center pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-400">
        Don't have a Healora account?{" "}
        <Link href={registerUrl} className="text-brand-primary hover:underline font-bold">
          Register here
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <Suspense fallback={<div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}