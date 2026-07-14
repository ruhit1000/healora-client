"use client";

import React from "react";
import { Button, Modal } from "@heroui/react";
import { FiCheckCircle, FiXCircle, FiSlash, FiUser } from "react-icons/fi";
import { DoctorProfile } from "@/lib/api/adminDoctors";

interface DoctorReviewModalProps {
  doctor: DoctorProfile | null;
  isProcessing: boolean;
  onClose: () => void;
  onAction: (doctorId: string, action: "approve" | "reject" | "suspend") => void;
}

export function DoctorReviewModal({ doctor, isProcessing, onClose, onAction }: DoctorReviewModalProps) {

  if (!doctor) return null;

  return (
    <Modal defaultOpen onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-125">
            <Modal.CloseTrigger onClick={onClose} />
            
            <Modal.Header>
              <Modal.Icon className="bg-blue-50 text-brand-primary">
                <FiUser className="size-5" />
              </Modal.Icon>
              <div>
                <Modal.Heading>{doctor.name}</Modal.Heading>
                <p className="text-xs font-bold text-slate-500 mt-1">{doctor.specialty}</p>
              </div>
            </Modal.Header>
            
            <Modal.Body>
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                    <p className="font-medium text-slate-900">{doctor.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">License Number</p>
                    <p className="font-mono font-medium text-slate-900 bg-slate-100 px-2 py-1 rounded inline-block">
                      {doctor.bmdcNumber || "Not Provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Experience</p>
                    <p className="font-medium text-slate-900">{doctor.experienceYears ? `${doctor.experienceYears} Years` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Consultation Fee</p>
                    <p className="font-bold text-slate-900">৳ {doctor.fee}</p>
                  </div>
                </div>
                
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl mt-4">
                  <p className="text-xs text-amber-800 font-medium">
                    Ensure you have verified the license number against the national medical registry before approving.
                  </p>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer className="flex gap-3">
              {(!doctor.isApproved || doctor.status === "Suspended") && (
                <Button 
                  className="flex-1 font-bold bg-emerald-500 text-white shadow-sm hover:bg-emerald-600"
                  isDisabled={isProcessing}
                  onClick={() => onAction(doctor._id, "approve")}
                >
                  <FiCheckCircle className="mr-2" /> Approve
                </Button>
              )}
              
              {doctor.status !== "Rejected" && !doctor.isApproved && (
                <Button 
                  variant="danger"
                  className="flex-1 font-bold"
                  isDisabled={isProcessing}
                  onClick={() => onAction(doctor._id, "reject")}
                >
                  <FiXCircle className="mr-2" /> Reject
                </Button>
              )}

              {doctor.isApproved && (
                <Button 
                  variant="danger-soft"
                  className="flex-1 font-bold"
                  isDisabled={isProcessing}
                  onClick={() => onAction(doctor._id, "suspend")}
                >
                  <FiSlash className="mr-2" /> Suspend
                </Button>
              )}
            </Modal.Footer>
            
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}