"use client";

import React, { useEffect, useState } from "react";
import { getAllDoctorsForAdmin, updateDoctorStatus, DoctorProfile } from "@/lib/api/adminDoctors";
import { BeatLoader } from "react-spinners";
import { Card, Chip, Button } from "@heroui/react";
import { FiEye, FiSearch } from "react-icons/fi";
import { DoctorReviewModal } from "@/components/admin/DoctorReviewModal";

type ChipColor = "accent" | "success" | "warning" | "danger";

export default function AdminDoctorVerificationPage() {
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [filter, setFilter] = useState<"All" | "Pending" | "Approved" | "Rejected" | "Suspended">("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal State
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      const data = await getAllDoctorsForAdmin();
      setDoctors(data);
      setIsLoading(false);
    };
    fetchDoctors();
  }, []);

  const handleAction = async (doctorId: string, action: "approve" | "reject" | "suspend") => {
    setIsProcessing(true);
    const success = await updateDoctorStatus(doctorId, action);
    
    if (success) {
      setDoctors((prev) => 
        prev.map((doc) => {
          if (doc._id === doctorId) {
            let newStatus = doc.status;
            let newIsApproved = doc.isApproved;
            
            if (action === "approve") { newStatus = "Approved"; newIsApproved = true; }
            if (action === "reject") { newStatus = "Rejected"; newIsApproved = false; }
            if (action === "suspend") { newStatus = "Suspended"; newIsApproved = false; }
            
            return { ...doc, status: newStatus, isApproved: newIsApproved };
          }
          return doc;
        })
      );
      setSelectedDoctor(null);
    } else {
      alert(`Failed to ${action} doctor. Please try again.`);
    }
    setIsProcessing(false);
  };

  const filteredDoctors = doctors.filter((doc) => {
    const matchesFilter = 
      filter === "All" || 
      (filter === "Pending" && !doc.isApproved && doc.status !== "Rejected" && doc.status !== "Suspended") ||
      doc.status === filter;
      
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status?: string, isApproved?: boolean): ChipColor => {
    if (status === "Approved" || isApproved) return "success";
    if (status === "Rejected") return "danger";
    if (status === "Suspended") return "warning";
    return "accent";
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <BeatLoader color="var(--brand-primary, #0f62fe)" size={10} speedMultiplier={0.8} />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loading Practitioner Roster...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fadeIn relative">
      
      {/* Action Header & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-slate-200 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Doctor Verifications</h1>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">Review credentials and manage platform access for medical professionals.</p>
        </div>
        <div className="relative w-full lg:w-72">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or specialty..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {(["All", "Pending", "Approved", "Rejected", "Suspended"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors ${
              filter === tab 
                ? "bg-slate-900 text-white" 
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <Card className="border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Doctor Name</th>
                <th className="px-6 py-4">Specialty</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doc) => (
                  <tr key={doc._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{doc.name}</td>
                    <td className="px-6 py-4 font-medium text-slate-600">{doc.specialty}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Chip 
                        size="sm" 
                        color={getStatusColor(doc.status, doc.isApproved)} 
                        className="font-bold text-[10px] uppercase"
                      >
                        {doc.status || (doc.isApproved ? "Approved" : "Pending")}
                      </Chip>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setSelectedDoctor(doc)}
                        className="font-bold text-xs text-brand-primary"
                      >
                        <FiEye className="mr-1" /> Review
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-xs font-medium">
                    No doctors found matching the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Render our separated HeroUI Modal */}
      <DoctorReviewModal 
        doctor={selectedDoctor} 
        isProcessing={isProcessing} 
        onClose={() => setSelectedDoctor(null)} 
        onAction={handleAction} 
      />

    </div>
  );
}