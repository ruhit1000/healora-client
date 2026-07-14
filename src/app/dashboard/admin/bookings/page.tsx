"use client";

import React, { useEffect, useState } from "react";
import { getAdminBookingsLedger, AdminBookingRecord, AdminBookingsMetrics, PaginationMeta } from "@/lib/api/adminBookings";
import { Card, Button } from "@heroui/react";
import { FiSearch, FiDownload, FiCalendar, FiDollarSign, FiCheckCircle, FiClock } from "react-icons/fi";
import { BookingsTable } from "@/components/admin/BookingsTable";

type FilterStatus = "All" | "Paid" | "Pending" | "Cancelled";

export default function AdminBookingsPage() {
  // Data State
  const [records, setRecords] = useState<AdminBookingRecord[]>([]);
  const [metrics, setMetrics] = useState<AdminBookingsMetrics | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta>({ currentPage: 1, limit: 10, totalPages: 1, totalResults: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Filter & Search State
  const [status, setStatus] = useState<FilterStatus>("All");
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  // 2. Fetch Data when filters change
  useEffect(() => {
    const fetchLedger = async () => {
      setIsLoading(true);
      const response = await getAdminBookingsLedger({
        page,
        limit: 10,
        status,
        search: debouncedSearch,
      });

      if (response) {
        setRecords(response.data);
        setMetrics(response.metrics);
        setPagination(response.pagination);
      }
      setIsLoading(false);
    };

    fetchLedger();
  }, [page, status, debouncedSearch]);

  const formatCurrency = (amount: number) => `৳ ${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-fadeIn relative">
      
      {/* HEADER ZONE */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-slate-200 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Global Bookings Ledger</h1>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">Real-time operational log of all platform appointments and transactions.</p>
        </div>
        <Button className="bg-brand-primary text-white text-xs font-bold px-4 h-9 rounded-lg shadow-sm">
          <FiDownload className="mr-1" /> Export CSV Log
        </Button>
      </div>

      {/* ZONE 1: Quick Operational Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FiCalendar className="w-4 h-4" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Appts</p>
          </div>
          <p className="text-2xl font-black text-slate-900">
            {metrics ? metrics.totalAppointments.toLocaleString() : "..."}
          </p>
        </Card>

        <Card className="p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><FiDollarSign className="w-4 h-4" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Gross Volume</p>
          </div>
          <p className="text-2xl font-black text-slate-900">
            {metrics ? formatCurrency(metrics.grossVolume) : "..."}
          </p>
        </Card>

        <Card className="p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><FiCheckCircle className="w-4 h-4" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Completed</p>
          </div>
          <p className="text-2xl font-black text-slate-900">
            {metrics ? metrics.completedCount.toLocaleString() : "..."}
          </p>
        </Card>

        <Card className="p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><FiClock className="w-4 h-4" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Pending Pay</p>
          </div>
          <p className="text-2xl font-black text-slate-900">
            {metrics ? metrics.pendingPaymentCount.toLocaleString() : "..."}
          </p>
        </Card>
      </div>

      {/* ZONE 2: Execution Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        
        {/* Status Filters */}
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          {(["All", "Pending", "Paid", "Cancelled"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setStatus(tab);
                setPage(1); // Reset page on filter change
              }}
              className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors flex-1 lg:flex-none ${
                status === tab 
                  ? "bg-slate-900 text-white" 
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-80">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search Patient or Doctor..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm font-medium border border-slate-200 rounded-lg focus:outline-none focus:border-brand-primary bg-slate-50 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* ZONE 3: Global Records Table Component */}
      <BookingsTable 
        records={records} 
        pagination={pagination} 
        isLoading={isLoading} 
        onPageChange={(newPage) => setPage(newPage)} 
      />

    </div>
  );
}