"use client";

import React, { useEffect, useState } from "react";
import { getDoctorProfile, updateDoctorProfile, DoctorProfileData } from "@/lib/api/doctorProfile";
import { BeatLoader } from "react-spinners";
import { Card, Button, Chip } from "@heroui/react";
import { CircleFill } from "@gravity-ui/icons";
import { FiUser, FiBriefcase, FiDollarSign, FiAward, FiFileText, FiCheckCircle, FiAlertCircle, FiClock, FiCalendar } from "react-icons/fi";

export default function DoctorProfilePage() {
  const [formData, setFormData] = useState<Omit<DoctorProfileData, "_id" | "isApproved" | "patientSatisfactoryScore" | "experienceTimeline" | "weeklySlots" | "reviews">>({
    name: "",
    title: "",
    image: "",
    specialty: "",
    fee: 0,
    followUpFee: 0,
    followUpWindowDays: 7,
    location: "",
    bmdcNumber: "",
    experienceYears: 0,
    hospitalAffiliation: "",
    availabilitySummary: "",
    appointmentConsultationTime: "",
    biography: "",
  });

  const [isNewUser, setIsNewUser] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [ratingData, setRatingData] = useState({ averageRating: 0, totalReviewsCount: 0 });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getDoctorProfile();
        if (data) {
          setFormData({
            name: data.name || "",
            title: data.title || "",
            image: data.image || "",
            specialty: data.specialty || "",
            fee: data.fee || 0,
            followUpFee: data.followUpFee || 0,
            followUpWindowDays: data.followUpWindowDays || 7,
            location: data.location || "",
            bmdcNumber: data.bmdcNumber || "",
            experienceYears: data.experienceYears || 0,
            hospitalAffiliation: data.hospitalAffiliation || "",
            availabilitySummary: data.availabilitySummary || "",
            appointmentConsultationTime: data.appointmentConsultationTime || "",
            biography: data.biography || "",
          });
          setIsApproved(!!data.isApproved);
          if (data.patientSatisfactoryScore) {
            setRatingData(data.patientSatisfactoryScore);
          }
          setIsNewUser(false);
        } else {
          setIsNewUser(true);
        }
      } catch (error) {
        console.error("Failed to load profile parameters:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setAlert(null);

    const success = await updateDoctorProfile(formData);
    if (success) {
      setAlert({ type: "success", message: "Profile saved and synchronized successfully." });
      setIsNewUser(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setAlert({ type: "error", message: "Failed to update profile settings. Try again." });
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <BeatLoader color="var(--brand-primary, #0f62fe)" size={10} speedMultiplier={0.8} />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loading Configuration...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fadeIn">
      
      {/* Dynamic Header Notification */}
      {alert && (
        <div className={`p-4 rounded-xl text-xs font-bold border flex items-center gap-2 ${
          alert.type === "success" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"
        }`}>
          {alert.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
          <span>{alert.message}</span>
        </div>
      )}

      {/* Profile State Banners */}
      {isNewUser ? (
        <Card className="border border-blue-200 bg-blue-50/40 rounded-2xl shadow-none">
          <div className="p-5 flex flex-col gap-1">
            <h4 className="text-xs font-black text-blue-800 uppercase tracking-wider">Onboarding Profile Setup</h4>
            <p className="text-xs font-medium text-blue-700 leading-relaxed">
              Please complete and submit your details below to activate your listing and become visible in online patient directories.
            </p>
          </div>
        </Card>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-5 gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Practitioner Profile</h1>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">Manage public clinical registry details and credentials.</p>
          </div>
          <Chip color={isApproved ? "success" : "warning"} variant="primary" className="h-8">
            <CircleFill width={6} />
            <Chip.Label>{isApproved ? "Verified & Public" : "Under Review Audit"}</Chip.Label>
          </Chip>
        </div>
      )}

      {/* Main Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* ROW 1: CORE MEDICAL IDENTITY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2"><FiUser className="text-slate-400" /> Professional Identity</h3>
            <p className="text-xs font-medium text-slate-400 leading-relaxed">Your public naming credentials, medical credentials, and directory category fields.</p>
          </div>
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 shadow-sm">
            <div className="form-control">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Full Legal Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g., Dr. Amrita Lal Halder" className="input input-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30 placeholder:text-slate-300/60 placeholder:font-medium" />
            </div>
            <div className="form-control">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Medical Specialty</label>
              <input type="text" name="specialty" value={formData.specialty} onChange={handleInputChange} required placeholder="e.g., Pediatrics, Cardiology" className="input input-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30 placeholder:text-slate-300/60 placeholder:font-medium" />
            </div>
            <div className="form-control sm:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Qualifications & Title Summary</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g., MBBS, FCPS (Pediatrics)" className="input input-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30 placeholder:text-slate-300/60 placeholder:font-medium" />
            </div>
            <div className="form-control sm:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Avatar Profile Image URL</label>
              <input type="url" name="image" value={formData.image} onChange={handleInputChange} required placeholder="https://..." className="input input-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30 placeholder:text-slate-300/60 placeholder:font-medium" />
            </div>
          </div>
        </div>

        {/* ROW 2: VERIFICATION PARAMETERS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2"><FiAward className="text-slate-400" /> Regulatory & Validation</h3>
            <p className="text-xs font-medium text-slate-400 leading-relaxed">Official licensing identification numbers to pass automated verification audits.</p>
          </div>
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-5 shadow-sm">
            <div className="form-control">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">BMDC Number</label>
              <input type="text" name="bmdcNumber" value={formData.bmdcNumber} onChange={handleInputChange} required placeholder="e.g., A43328" className="input input-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30 font-mono placeholder:text-slate-300/60 placeholder:font-medium" />
            </div>
            <div className="form-control">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Years of Exp.</label>
              <input type="number" name="experienceYears" value={formData.experienceYears} onChange={handleInputChange} required placeholder="e.g., 19" className="input input-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30 placeholder:text-slate-300/60 placeholder:font-medium" />
            </div>
            <div className="form-control">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Chamber City</label>
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} required placeholder="e.g., Segunbagicha, Dhaka" className="input input-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30 placeholder:text-slate-300/60 placeholder:font-medium" />
            </div>
            <div className="form-control sm:col-span-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Primary Hospital Affiliation</label>
              <input type="text" name="hospitalAffiliation" value={formData.hospitalAffiliation} onChange={handleInputChange} required placeholder="e.g., BIRDEM Women and Children Hospital" className="input input-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30 placeholder:text-slate-300/60 placeholder:font-medium" />
            </div>
          </div>
        </div>

        {/* ROW 3: FEE MATRIX STRATEGY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2"><FiDollarSign className="text-slate-400" /> Consultation Financials</h3>
            <p className="text-xs font-medium text-slate-400 leading-relaxed">Determine your custom gateway pricing values and follow-up expiration limits.</p>
          </div>
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-5 shadow-sm">
            <div className="form-control">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Base Fee (BDT)</label>
              <input type="number" name="fee" value={formData.fee} onChange={handleInputChange} required placeholder="1200" className="input input-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30 font-mono placeholder:text-slate-300/60 placeholder:font-medium" />
            </div>
            <div className="form-control">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Follow-Up (BDT)</label>
              <input type="number" name="followUpFee" value={formData.followUpFee} onChange={handleInputChange} required placeholder="600" className="input input-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30 font-mono placeholder:text-slate-300/60 placeholder:font-medium" />
            </div>
            <div className="form-control">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Follow-Up Window</label>
              <select name="followUpWindowDays" value={formData.followUpWindowDays} onChange={handleInputChange} required className="select select-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30 appearance-none">
                <option value={0}>No Follow-Up</option>
                <option value={7}>7 Days</option>
                <option value={14}>14 Days</option>
                <option value={21}>21 Days</option>
                <option value={30}>30 Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* ROW 4: SCHEDULING OVERVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2"><FiCalendar className="text-slate-400" /> Scheduling Overview</h3>
            <p className="text-xs font-medium text-slate-400 leading-relaxed">High-level summaries of your availability for patient display cards.</p>
          </div>
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 shadow-sm">
            <div className="form-control">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1"><FiCalendar className="w-3 h-3"/> Availability Summary</label>
              <input type="text" name="availabilitySummary" value={formData.availabilitySummary} onChange={handleInputChange} required placeholder="e.g., Sun - Tue, 9:00 AM - 11:00 AM" className="input input-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30 placeholder:text-slate-300/60 placeholder:font-medium" />
            </div>
            <div className="form-control">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1"><FiClock className="w-3 h-3"/> Consultation Hours</label>
              <input type="text" name="appointmentConsultationTime" value={formData.appointmentConsultationTime} onChange={handleInputChange} required placeholder="e.g., Sun - Tue (9:00 AM - 11:00 AM)" className="input input-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30 placeholder:text-slate-300/60 placeholder:font-medium" />
            </div>
          </div>
        </div>

        {/* ROW 5: PROFESSIONAL CLINICAL BIOGRAPHY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2"><FiBriefcase className="text-slate-400" /> Biography Overview</h3>
            <p className="text-xs font-medium text-slate-400 leading-relaxed">Clinical summary, field specializations, and statements shown publicly to prospective patients.</p>
          </div>
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="form-control w-full">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Biography Statement</label>
              <textarea name="biography" value={formData.biography} onChange={handleInputChange} required rows={5} placeholder="Write a summary about your medical specializations..." className="textarea textarea-bordered w-full text-xs font-bold rounded-xl focus:outline-none focus:border-brand-primary bg-slate-50/30 p-4 leading-relaxed placeholder:text-slate-300/60 placeholder:font-medium" />
            </div>
          </div>
        </div>

        {/* RATING DISPLAY PANEL (IF FOUND NOT NEW) */}
        {!isNewUser && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2"><FiFileText className="text-slate-400" /> Public Feedback Summary</h3>
              <p className="text-xs font-medium text-slate-400 leading-relaxed">Aggregated operational metric scores generated automatically from patient appointment reviews.</p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Average Review Score</p>
                <p className="text-2xl font-black text-slate-900">{ratingData.averageRating} ★</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Total Patient Appraisals</p>
                <p className="text-2xl font-black text-slate-900">{ratingData.totalReviewsCount} Submissions</p>
              </div>
            </div>
          </div>
        )}

        {/* ACTION TRIGGER BUTTON */}
        <div className="pt-5 border-t border-slate-200 flex justify-end">
          <Button type="submit" variant="primary" isDisabled={isSaving} className="px-6 py-3 bg-brand-primary text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all disabled:opacity-50">
            {isSaving ? "Saving Registry Updates..." : "Save Configuration Data"}
          </Button>
        </div>

      </form>
    </div>
  );
}