"use client";

import React from "react";
import { Card, Chip, Button } from "@heroui/react";
import { FiChevronLeft, FiChevronRight, FiShield, FiUserMinus } from "react-icons/fi";
import { AdminUserRecord } from "@/lib/api/adminUsers";
import { PaginationMeta } from "@/lib/api/adminBookings";

type ChipColor = "accent" | "success" | "warning" | "danger";

interface UsersTableProps {
  records: AdminUserRecord[];
  pagination: PaginationMeta;
  isLoading: boolean;
  currentAdminId: string;
  onPageChange: (newPage: number) => void;
  onRequestRoleChange: (user: AdminUserRecord, targetRole: "admin" | "patient") => void;
}

export function UsersTable({ records, pagination, isLoading, currentAdminId, onPageChange, onRequestRoleChange }: UsersTableProps) {
  
  const getRoleColor = (role: string): ChipColor => {
    if (role === "admin") return "danger";
    if (role === "doctor") return "success";
    return "accent"; // patient
  };

  return (
    <Card className="border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">User Details</th>
              <th className="px-6 py-4">Platform Role</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4 text-right">Access Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 text-xs font-bold animate-pulse">
                  Scanning user directory...
                </td>
              </tr>
            ) : records.length > 0 ? (
              records.map((user) => {
                const isSelf = user._id === currentAdminId;
                
                return (
                  <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{user.name}</p>
                      <p className="text-[10px] font-semibold text-slate-500 mt-0.5">{user.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Chip 
                        size="sm" 
                        color={getRoleColor(user.role)} 
                        className="font-bold text-[10px] uppercase"
                      >
                        {user.role}
                      </Chip>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {/* Only allow modifying non-self accounts, and doctors can't easily be converted to pure patients/admins without separate workflow usually, but we allow it here per your story */}
                      {isSelf ? (
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-wider pr-4">Active Session</span>
                      ) : (
                        <div className="flex justify-end gap-2">
                          {user.role !== "admin" ? (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => onRequestRoleChange(user, "admin")}
                              className="font-bold text-xs text-emerald-600"
                            >
                              <FiShield className="mr-1" /> Promote
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="danger-soft"
                              onClick={() => onRequestRoleChange(user, "patient")}
                              className="font-bold text-xs"
                            >
                              <FiUserMinus className="mr-1" /> Demote
                            </Button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 text-xs font-medium">
                  No users found matching your search criteria.
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
            Showing Page {pagination.currentPage} of {pagination.totalPages} <span className="font-normal mx-1">|</span> {pagination.totalResults} Total Users
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