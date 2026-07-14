"use client";

import React, { useEffect, useState } from "react";
import { getAdminUsersLedger, updateUserRole, AdminUserRecord } from "@/lib/api/adminUsers";
import { PaginationMeta } from "@/lib/api/adminBookings";
import { useSession } from "@/lib/auth-client";
import { FiSearch, FiUsers } from "react-icons/fi";
import { UsersTable } from "@/components/admin/UsersTable";
import { UserRoleModal } from "@/components/admin/UserRoleModal";

type FilterRole = "All" | "patient" | "doctor" | "admin";

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id as string;

  // Data & Pagination State
  const [records, setRecords] = useState<AdminUserRecord[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({ currentPage: 1, limit: 10, totalPages: 1, totalResults: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Filter & Search State
  const [roleFilter, setRoleFilter] = useState<FilterRole>("All");
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Modal State
  const [selectedUser, setSelectedUser] = useState<AdminUserRecord | null>(null);
  const [targetRole, setTargetRole] = useState<"admin" | "patient" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // 1. Debounce Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  // 2. Fetch Users Data
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const response = await getAdminUsersLedger({
        page,
        limit: 10,
        role: roleFilter,
        search: debouncedSearch,
      });

      if (response) {
        setRecords(response.data);
        setPagination(response.pagination);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, [page, roleFilter, debouncedSearch]);

  // 3. Execution Handler for Modal
  const handleRoleChangeConfirm = async (userId: string, newRole: "admin" | "patient") => {
    setIsProcessing(true);
    const success = await updateUserRole(userId, newRole);
    
    if (success) {
      // Optimistically update the UI without needing a full refetch
      setRecords((prev) => 
        prev.map((user) => 
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      setSelectedUser(null);
      setTargetRole(null);
    } else {
      alert("Failed to update user role. Please check network and permissions.");
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fadeIn relative">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-slate-200 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FiUsers className="text-brand-primary" /> User Directory
          </h1>
          <p className="text-xs font-semibold text-slate-400 mt-1">Manage accounts, assign administrative privileges, and monitor platform registration.</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        
        {/* Role Tabs */}
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          {(["All", "patient", "doctor", "admin"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setRoleFilter(tab);
                setPage(1);
              }}
              className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors flex-1 lg:flex-none ${
                roleFilter === tab 
                  ? "bg-slate-900 text-white" 
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {tab === "patient" ? "Patients" : tab === "doctor" ? "Doctors" : tab === "admin" ? "Admins" : "All Users"}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm font-medium border border-slate-200 rounded-lg focus:outline-none focus:border-brand-primary bg-slate-50 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Data Table Component */}
      <UsersTable 
        records={records} 
        pagination={pagination} 
        isLoading={isLoading} 
        currentAdminId={currentUserId}
        onPageChange={(newPage) => setPage(newPage)}
        onRequestRoleChange={(user, role) => {
          setSelectedUser(user);
          setTargetRole(role);
        }}
      />

      {/* Confirmation Modal */}
      <UserRoleModal 
        user={selectedUser}
        targetRole={targetRole}
        isProcessing={isProcessing}
        onClose={() => {
          setSelectedUser(null);
          setTargetRole(null);
        }}
        onConfirm={handleRoleChangeConfirm}
      />

    </div>
  );
}