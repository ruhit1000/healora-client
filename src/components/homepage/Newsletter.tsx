"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/shared/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API request to backend newsletter route
    setTimeout(() => {
      setStatus("success");
      toast.success("Successfully subscribed to health alerts!");
      setEmail("");
    }, 1200);
  };

  return (
    <section className="w-full py-16 bg-neutral-text text-white relative overflow-hidden">
      {/* Background Subtle Graphic Accent Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-brand-primary" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-brand-accent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading Copy */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Stay Updated on Local Health Experts
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto lg:mx-0 font-medium leading-relaxed">
              Get notified when new verified doctors join in your area or when seasonal health slots open up near you. No spam, ever.
            </p>
          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto lg:max-w-none">
            {status === "success" ? (
              <div className="bg-brand-accent/10 border border-brand-accent/30 p-4 rounded-healora text-center text-brand-accent font-semibold text-sm animate-fade-in">
                🎉 Thank you! You have successfully subscribed to health alerts.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full">
                <div className="relative grow">
                  <input
                    type="email"
                    required
                    disabled={status === "loading"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-healora text-sm text-white placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all duration-200 font-medium disabled:opacity-60"
                  />
                </div>
                
                <Button
                  type="submit"
                  isLoading={status === "loading"}
                  variant="primary"
                  className="px-6 py-6 font-bold shadow-md hover:shadow-lg w-full sm:w-auto"
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            )}
            
            {/* Context Notice under the Input element */}
            {status !== "success" && (
              <p className="text-[11px] text-slate-400 text-center lg:text-left mt-2.5 font-medium">
                By signing up, you agree to receive platform updates. You can opt out at any time.
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}