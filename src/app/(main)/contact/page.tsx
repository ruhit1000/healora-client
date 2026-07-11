'use client';
import ContactForm from "@/components/contact/ContactForm";
import React from "react";

export default function ContactPage() {
    return (
        <div className="bg-slate-50 text-slate-900 min-h-screen pt-24 pb-16 font-sans">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                    <span className="text-xs font-bold text-brand-accent uppercase tracking-widest bg-emerald-50 border border-brand-accent/20 px-3 py-1 rounded-full shadow-2xs">
                        Get In Touch
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black text-neutral-text mt-2 tracking-tight">
                        We Are Here to Help You
                    </h1>
                    <p className="text-sm text-slate-600 font-medium">
                        Have questions about booking a slot or verifying your clinic profile? Drop us a message and our team will get back to you shortly.
                    </p>
                </div>

                {/* Main Content Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

                    {/* Left Column (5 Cols): Quick Connect Details */}
                    <div className="lg:col-span-5 flex flex-col justify-between gap-6">

                        <div className="bg-white border border-slate-100 p-6 rounded-healora shadow-sm space-y-3">
                            <div className="p-2.5 bg-brand-primary/10 text-brand-primary rounded-xl w-fit">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-base font-bold text-neutral-text tracking-tight">Email Support</h3>
                            <p className="text-xs text-slate-500 font-medium">For booking questions, account issues, or general help.</p>
                            <p className="text-sm font-bold text-brand-primary">support@healora.com</p>
                        </div>

                        <div className="bg-white border border-slate-100 p-6 rounded-healora shadow-sm space-y-3">
                            <div className="p-2.5 bg-brand-accent/10 text-brand-accent rounded-xl w-fit">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-base font-bold text-neutral-text tracking-tight">Medical Providers</h3>
                            <p className="text-xs text-slate-500 font-medium">For doctors looking to list their private practice or verify licenses.</p>
                            <p className="text-sm font-bold text-brand-accent">partners@healora.com</p>
                        </div>

                        <div className="bg-linear-to-br from-brand-primary to-brand-accent p-6 rounded-healora text-white shadow-md grow flex flex-col justify-center space-y-2">
                            <h3 className="text-lg font-bold tracking-tight">Looking for a Doctor?</h3>
                            <p className="text-xs text-sky-50/90 font-medium leading-relaxed">
                                You don't need to call us to book! Browse our live, verified schedule list directly to lock your personal slot online right now.
                            </p>
                        </div>

                    </div>

                    <div className="lg:col-span-7 bg-white border border-slate-100 p-8 rounded-healora shadow-sm flex flex-col justify-between">
                        <ContactForm />
                    </div>

                </div>

            </div>
        </div>
    );
}