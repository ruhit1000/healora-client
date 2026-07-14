"use client";

import React, { useEffect, useState } from "react";
import { getDoctorEarnings, EarningsResponseData } from "@/lib/api/doctorEarnings";
import { BeatLoader } from "react-spinners";
import { Card, Chip } from "@heroui/react";
import { FiDollarSign, FiCalendar, FiUsers, FiClock, FiDownload } from "react-icons/fi";

export default function DoctorEarningPage() {
  const [data, setData] = useState<EarningsResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      const result = await getDoctorEarnings();
      if (result) setData(result);
      setIsLoading(false);
    };
    fetchEarnings();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <BeatLoader color="var(--brand-primary, #0f62fe)" size={10} speedMultiplier={0.8} />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Compiling Financial Data...</p>
      </div>
    );
  }

  const metrics = data?.metrics || {
    totalEarned: 0,
    thisMonthEarned: 0,
    totalPaidAppointments: 0,
    pendingAmount: 0,
  };
  
  const transactions = data?.transactions || [];
  
  const formatCurrency = (amount: number) => `৳ ${amount.toLocaleString()}`;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fadeIn">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Earnings & Revenue</h1>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">Overview of your financial performance and recent payouts.</p>
        </div>
        <button className="flex items-center gap-2 text-xs font-bold text-brand-primary bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
          <FiDownload /> Download Report
        </button>
      </div>

      {/* ZONE 1: Metrics Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><FiDollarSign className="w-5 h-5" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Earned</p>
          </div>
          <p className="text-3xl font-black text-slate-900">{formatCurrency(metrics.totalEarned)}</p>
        </Card>

        <Card className="p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FiCalendar className="w-5 h-5" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">This Month</p>
          </div>
          <p className="text-3xl font-black text-slate-900">{formatCurrency(metrics.thisMonthEarned)}</p>
        </Card>

        <Card className="p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><FiUsers className="w-5 h-5" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total Paid Appointments</p>
          </div>
          <p className="text-3xl font-black text-slate-900">{metrics.totalPaidAppointments} <span className="text-sm font-medium text-slate-400">Appts</span></p>
        </Card>

        <Card className="p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><FiClock className="w-5 h-5" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Pending / Unpaid</p>
          </div>
          <p className="text-3xl font-black text-slate-900">{formatCurrency(metrics.pendingAmount)}</p>
        </Card>
      </div>

      {/* ZONE 2: Transaction Ledger */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Recent Transactions</h3>
        
        <Card className="border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Patient Name</th>
                  <th className="px-6 py-4">Trx ID (Stripe)</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.length > 0 ? (
                  transactions.map((trx) => (
                    <tr key={trx._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-600">{trx.appointmentDate}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{trx.patientName}</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-400">
                        {trx.stripeSessionId ? `${trx.stripeSessionId.substring(0, 16)}...` : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <Chip 
                          size="sm" 
                          color={trx.paymentStatus === "Paid" ? "success" : "warning"} 
                          variant="primary"
                          className="font-bold text-[10px] uppercase"
                        >
                          {trx.paymentStatus}
                        </Chip>
                      </td>
                      <td className="px-6 py-4 font-black text-slate-900 text-right">
                        {formatCurrency(trx.consultationFee)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-xs font-medium">
                      No recent transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

    </div>
  );
}