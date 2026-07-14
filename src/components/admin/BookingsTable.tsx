"use client";

import React from "react";
import { Card, Chip, Button } from "@heroui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AdminBookingRecord, PaginationMeta } from "@/lib/api/adminBookings";

type ChipColor = "accent" | "success" | "warning" | "danger";

interface BookingsTableProps {
  records: AdminBookingRecord[];
  pagination: PaginationMeta;
  isLoading: boolean;
  onPageChange: (newPage: number) => void;
}

export function BookingsTable({ records, pagination, isLoading, onPageChange }: BookingsTableProps) {
  const getPaymentStatusColor = (status: string): ChipColor => {
    if (status === "Paid") return "success";
    if (status === "Pending") return "warning";
    if (status === "Cancelled") return "danger";
    return "accent";
  };
  console.log("records", records);

  const getAppointmentStatusColor = (status: string): ChipColor => {
    if (status === "Completed") return "success";
    if (status === "Pending") return "warning";
    if (status === "Cancelled") return "danger";
    return "accent";
  };

  return (
    <Card className="border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Patient Name</th>
              <th className="px-6 py-4">Assigned Doctor</th>
              <th className="px-6 py-4">Fee</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4 text-right">Appt. Status</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 relative">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-xs font-bold animate-pulse">
                  Syncing ledger records...
                </td>
              </tr>
            ) : records.length > 0 ? (
              records.map((record) => (
                <tr key={record._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{new Date(record.appointmentDate).toLocaleDateString()}</p>
                    <p className="text-[10px] font-semibold text-slate-500 mt-0.5">{record.appointmentTime}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">{record.patientName || "Unknown"}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{record.doctorName || "Unassigned"}</p>
                    <p className="text-[10px] font-semibold text-slate-500 mt-0.5">{record.doctorSpecialty}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">৳ {record.consultationFee}</td>
                  <td className="px-6 py-4">
                    <Chip 
                      size="sm" 
                      color={getPaymentStatusColor(record.paymentStatus)} 
                      className="font-bold text-[10px] uppercase"
                    >
                      {record.paymentStatus}
                    </Chip>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Chip 
                      size="sm" 
                      color={getAppointmentStatusColor(record.appointmentStatus)} 
                      className="font-bold text-[10px] uppercase border-none"
                    >
                      {record.appointmentStatus}
                    </Chip>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-xs font-medium">
                  No booking records found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {!isLoading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <p className="text-xs font-bold text-slate-400">
            Showing Page {pagination.currentPage} of {pagination.totalPages} <span className="font-normal mx-1">|</span> {pagination.totalResults} Total Records
          </p>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              isDisabled={pagination.currentPage === 1}
              onClick={() => onPageChange(pagination.currentPage - 1)}
              className="font-bold text-xs"
            >
              <FiChevronLeft className="mr-1" /> Prev
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              isDisabled={pagination.currentPage === pagination.totalPages}
              onClick={() => onPageChange(pagination.currentPage + 1)}
              className="font-bold text-xs"
            >
              Next <FiChevronRight className="ml-1" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}