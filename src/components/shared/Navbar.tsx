"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { dashboardPathForRole, normalizeRole } from "@/lib/roles";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending: isSessionPending } = useSession();

  const isLoggedIn = Boolean(session?.user);
  const userRole = normalizeRole((session?.user as { role?: unknown } | undefined)?.role);

  // Handle glassmorphism background effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic Route Definitions matching PRD requirements
  const loggedOutLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Doctors", href: "/doctors" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const loggedInLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Doctors", href: "/doctors" },
    { name: "About Us", href: "/about" },
    { name: "Dashboard", href: dashboardPathForRole(userRole) },
    { name: "Telehealth Support", href: "/support" },
  ];

  const currentLinks = isLoggedIn ? loggedInLinks : loggedOutLinks;

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    setIsSigningOut(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="shrink-0">
            <Link href="/" className="text-2xl font-extrabold text-brand-primary tracking-tight">
              Healora<span className="text-brand-accent">.</span>
            </Link>
          </div>

          {/* Desktop Navigation Paths */}
          <div className="hidden md:flex items-center space-x-8">
            {currentLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-brand-primary font-semibold"
                      : "text-slate-600 hover:text-brand-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleSignOut}
                disabled={isSigningOut || isSessionPending}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-brand-primary transition-colors duration-200"
              >
                {isSigningOut ? "Signing Out..." : "Sign Out"}
              </button>
            ) : (
              <>
                <Link
                  href={isSessionPending ? "#" : "/login"}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-brand-primary transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href={isSessionPending ? "#" : "/register"}
                  className="px-4 py-2 text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary/90 rounded-healora shadow-sm transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Responsive Mobile Menu Button Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-brand-primary hover:bg-slate-50 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Slide-down Mobile Drawer Overlay Panel */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100 visible" : "max-h-0 opacity-0 invisible overflow-hidden"}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b border-slate-100 shadow-lg">
          {currentLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? "bg-slate-50 text-brand-primary font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-brand-primary"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 pb-2 border-t border-slate-100 px-3 flex flex-col space-y-2">
            {isLoggedIn ? (
              <button
                onClick={handleSignOut}
                disabled={isSigningOut || isSessionPending}
                className="w-full text-center px-4 py-2 text-base font-medium text-slate-700 bg-slate-50 rounded-healora"
              >
                {isSigningOut ? "Signing Out..." : "Sign Out"}
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="w-full text-center px-4 py-2 text-base font-medium text-slate-700 bg-slate-50 rounded-healora"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center px-4 py-2 text-base font-medium text-white bg-brand-primary rounded-healora"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}