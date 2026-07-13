"use client";

import React, { useEffect, useState } from "react";
import { getPatientProfile, updatePatientProfile, PatientProfileData } from "@/lib/api/profile";
import { BeatLoader } from "react-spinners";
import { FiUser, FiPhone, FiMail, FiMapPin, FiHeart, FiShield, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function PatientProfilePage() {
  const [formData, setFormData] = useState<PatientProfileData>({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    address: "",
    emergencyContact: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getPatientProfile();
        if (data) setFormData(data);
      } catch (error) {
        console.error("Failed to fetch user profile details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setAlert(null);

    const isSuccess = await updatePatientProfile(formData);
    
    if (isSuccess) {
      setAlert({ type: "success", message: "Your changes have been saved successfully." });
      setTimeout(() => setAlert(null), 5000); // Auto-dismiss success alert
    } else {
      setAlert({ type: "error", message: "Failed to update profile indicators. Please try again." });
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <BeatLoader color="var(--brand-primary, #0f62fe)" size={10} speedMultiplier={0.8} />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loading your credentials...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fadeIn">
      
      {/* Dynamic Floating Alert Banner */}
      {alert && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-xl border backdrop-blur-sm animate-slideIn ${
          alert.type === "success" 
            ? "bg-emerald-50/90 text-emerald-800 border-emerald-200" 
            : "bg-rose-50/90 text-rose-700 border-rose-200"
        }`}>
          {alert.type === "success" ? <FiCheckCircle className="w-4 h-4 shrink-0" /> : <FiAlertCircle className="w-4 h-4 shrink-0" />}
          <span>{alert.message}</span>
        </div>
      )}

      {/* Header Sticky Action Hub */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Account Settings</h1>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">
            Manage your digital patient card and synchronization defaults.
          </p>
        </div>
        <button
          type="submit"
          form="profile-settings-form"
          disabled={isSaving}
          className="px-5 py-3 bg-brand-primary text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-brand-primary/95 flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed h-fit w-full sm:w-auto"
        >
          {isSaving ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Save Configuration"
          )}
        </button>
      </div>

      {/* Main Form System */}
      <form id="profile-settings-form" onSubmit={handleSubmit} className="space-y-10">
        
        {/* ROW 1: CORE IDENTITY CONFIGURATION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <FiUser className="text-slate-400" /> Core Profile
            </h3>
            <p className="text-xs font-medium text-slate-400 leading-relaxed">
              Your structural system identification parameters across Healora ecosystems.
            </p>
          </div>
          <div className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="form-control w-full">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Display Name</label>
              <div className="relative flex items-center">
                <FiUser className="absolute left-4 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input input-bordered w-full pl-11 text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary transition-colors bg-slate-50/30"
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Account Email</label>
              <div className="relative flex items-center">
                <FiMail className="absolute left-4 text-slate-300 w-4 h-4" />
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="input input-bordered w-full pl-11 text-xs font-bold rounded-xl bg-slate-50 border-slate-150 text-slate-400 cursor-not-allowed focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: CLINICAL DEMOGRAPHICS MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <FiHeart className="text-slate-400" /> Clinical Metadata
            </h3>
            <p className="text-xs font-medium text-slate-400 leading-relaxed">
              Medical diagnostics data points used securely for automated checkout and intake validation.
            </p>
          </div>
          <div className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="form-control w-full">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="select select-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-control w-full">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="input input-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30 font-mono"
              />
            </div>

            <div className="form-control w-full">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="select select-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30"
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>
        </div>

        {/* ROW 3: DISPATCH & EMERGENCY LOGISTICS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <FiShield className="text-slate-400" /> Contact & Logistics
            </h3>
            <p className="text-xs font-medium text-slate-400 leading-relaxed">
              Communication pathways and fallback options for emergency treatment pipelines.
            </p>
          </div>
          <div className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="form-control w-full">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                <div className="relative flex items-center">
                  <FiPhone className="absolute left-4 text-slate-400 w-4 h-4" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+880 1XXX XXXXXX"
                    className="input input-bordered w-full pl-11 text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30"
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Emergency Contact</label>
                <div className="relative flex items-center">
                  <FiShield className="absolute left-4 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Name - Relationship (Phone)"
                    className="input input-bordered w-full pl-11 text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30"
                  />
                </div>
              </div>
            </div>

            <div className="form-control w-full">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Mailing Address</label>
              <div className="relative flex items-center">
                <FiMapPin className="absolute left-4 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street, City, Bangladesh"
                  className="input input-bordered w-full pl-11 text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30"
                />
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}