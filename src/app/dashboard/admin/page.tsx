"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { dashboardPathForRole, normalizeRole } from "@/lib/roles";
import { getAdminOverview, AdminOverviewData } from "@/lib/api/adminOverview";
import { BeatLoader } from "react-spinners";
import { Card, Button } from "@heroui/react";
import { FiDollarSign, FiTrendingUp, FiUserCheck, FiUsers, FiDownload } from "react-icons/fi";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  BarChart, Bar 
} from "recharts";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, isPending: isAuthPending } = useSession();
  
  const [data, setData] = useState<AdminOverviewData | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Unified Security & Data Fetching Effect
  useEffect(() => {
    if (isAuthPending) return;

    if (!session?.user) {
      router.replace("/login");
      return;
    }

    const role = normalizeRole((session.user as { role?: unknown }).role);
    if (role !== "admin") {
      router.replace(dashboardPathForRole(role));
      return;
    }

    // Role is verified Admin, proceed to fetch sensitive data
    const loadData = async () => {
      const result = await getAdminOverview();
      console.log("Admin Overview Data:", result); // Debugging log
      if (result) setData(result);
      setIsDataLoading(false);
    };

    loadData();
  }, [isAuthPending, router, session]);

  const isLoading = isAuthPending || isDataLoading;

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <BeatLoader color="var(--brand-primary, #0f62fe)" size={10} speedMultiplier={0.8} />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verifying Clearance & Compiling Data...</p>
      </div>
    );
  }

  const metrics = data?.metrics || {
    totalProfit: 0,
    monthlyProfit: 0,
    activeDoctors: 0,
    totalUsers: 0,
  };

  const revenueTrend = data?.charts.revenueTrend || [];
  const specialtyData = data?.charts.specialtyDistribution || [];

  const formatCurrency = (amount: number) => `৳ ${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-fadeIn">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Control Center</h1>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">High-level platform metrics, financials, and user activity.</p>
        </div>
        <Button className="bg-brand-primary text-white text-xs font-bold px-4 h-9 rounded-lg">
          <FiDownload className="mr-1" /> Export Report
        </Button>
      </div>

      {/* ZONE 1: Key Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><FiDollarSign className="w-5 h-5" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Platform Profit</p>
          </div>
          <p className="text-3xl font-black text-slate-900">{formatCurrency(metrics.totalProfit)}</p>
        </Card>

        <Card className="p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FiTrendingUp className="w-5 h-5" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Monthly Profit (This Month)</p>
          </div>
          <p className="text-3xl font-black text-slate-900">{formatCurrency(metrics.monthlyProfit)}</p>
        </Card>

        <Card className="p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><FiUserCheck className="w-5 h-5" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Active Verified Doctors</p>
          </div>
          <p className="text-3xl font-black text-slate-900">{metrics.activeDoctors}</p>
        </Card>

        <Card className="p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg"><FiUsers className="w-5 h-5" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Registered Users</p>
          </div>
          <p className="text-3xl font-black text-slate-900">{metrics.totalUsers}</p>
        </Card>
      </div>

      {/* ZONE 2: Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Revenue Trend Area Chart */}
        <Card className="p-6 border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">6-Month Revenue Trend</h3>
            <p className="text-[10px] font-semibold text-slate-400 mt-1">Platform profit generated over the last 6 months.</p>
          </div>
          <div className="h-75 w-full">
            {revenueTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }}
                    tickFormatter={(val) => `৳${val/1000}k`}
                  />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    labelStyle={{ fontSize: '10px', fontWeight: 900, color: '#64748b' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 900, color: '#10b981' }}
                    formatter={(value) => [formatCurrency(Number(value) || 0), 'Profit']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs font-bold text-slate-400">
                Not enough financial data to generate trend.
              </div>
            )}
          </div>
        </Card>

        {/* Specialty Distribution Bar Chart */}
        <Card className="p-6 border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Top Appointment Specialties</h3>
            <p className="text-[10px] font-semibold text-slate-400 mt-1">Which medical departments generate the most bookings.</p>
          </div>
          <div className="h-75 w-full">
            {specialtyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={specialtyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }}
                  />
                  <RechartsTooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    labelStyle={{ fontSize: '10px', fontWeight: 900, color: '#64748b' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 900, color: '#0f62fe' }}
                  />
                  <Bar dataKey="appointments" fill="#0f62fe" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs font-bold text-slate-400">
                No appointment data available.
              </div>
            )}
          </div>
        </Card>

      </div>
    </div>
  );
}