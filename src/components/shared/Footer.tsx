import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white border-t border-slate-200/80 pt-16 pb-8 text-slate-600 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Upper Layout Grid Grid Panel */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-100">

                    {/* Column 1: Brand Space & Logo Wrapper Container Placeholder */}
                    <div className="md:col-span-4 space-y-4">
                        {/* LOGO PLACEHOLDER BOX: Swap this box out with your SVG asset layout later */}
                        <Image
                            src="/healora_logo.png"
                            alt="Healora Logo"
                            width={112}
                            height={36}
                        />

                        <p className="text-xs text-slate-500 max-w-xs font-medium leading-relaxed">
                            Making healthcare simple and stress-free by offering instant, guaranteed doctor appointments right on your schedule.
                        </p>
                    </div>

                    {/* Column 2: Patient Actions Quick Links */}
                    <div className="md:col-span-3 space-y-3">
                        <h4 className="text-xs font-bold text-neutral-text uppercase tracking-wider">
                            For Patients
                        </h4>
                        <ul className="space-y-2 text-xs font-medium">
                            <li>
                                <Link href="/doctors" className="hover:text-brand-primary transition-colors duration-200">
                                    Find a Doctor
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-brand-primary transition-colors duration-200">
                                    How it Works
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="hover:text-brand-primary transition-colors duration-200">
                                    Log In Account
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Medical Staff Quick Links */}
                    <div className="md:col-span-3 space-y-3">
                        <h4 className="text-xs font-bold text-neutral-text uppercase tracking-wider">
                            For Providers
                        </h4>
                        <ul className="space-y-2 text-xs font-medium">
                            <li>
                                <Link href="/register?role=doctor" className="hover:text-brand-primary transition-colors duration-200">
                                    Join as a Doctor
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-brand-primary transition-colors duration-200">
                                    Doctor Portal
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-brand-primary transition-colors duration-200">
                                    Clinic Partnerships
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Help Desk Meta Utilities */}
                    <div className="md:col-span-2 space-y-3">
                        <h4 className="text-xs font-bold text-neutral-text uppercase tracking-wider">
                            Support
                        </h4>
                        <ul className="space-y-2 text-xs font-medium">
                            <li>
                                <Link href="/contact" className="hover:text-brand-primary transition-colors duration-200">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-brand-primary transition-colors duration-200">
                                    Common FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Lower Sub-Footer Legal Row Section */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-medium">
                    <div>
                        &copy; {currentYear} Healora. All rights reserved.
                    </div>

                    <div className="flex space-x-6">
                        <Link href="/privacy" className="hover:text-slate-600 transition-colors duration-200">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-slate-600 transition-colors duration-200">
                            Terms of Service
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}