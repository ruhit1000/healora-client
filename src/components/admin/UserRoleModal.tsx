"use client";

import React from "react";
import { Button, Modal } from "@heroui/react";
import { FiShield, FiAlertTriangle } from "react-icons/fi";
import { AdminUserRecord } from "@/lib/api/adminUsers";

interface UserRoleModalProps {
  user: AdminUserRecord | null;
  targetRole: "admin" | "patient" | null;
  isProcessing: boolean;
  onClose: () => void;
  onConfirm: (userId: string, role: "admin" | "patient") => void;
}

export function UserRoleModal({ user, targetRole, isProcessing, onClose, onConfirm }: UserRoleModalProps) {
  if (!user || !targetRole) return null;

  const isPromoting = targetRole === "admin";

  return (
    <Modal defaultOpen onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-100">
            <Modal.CloseTrigger onClick={onClose} />
            
            <Modal.Header>
              <Modal.Icon className={isPromoting ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}>
                {isPromoting ? <FiShield className="size-5" /> : <FiAlertTriangle className="size-5" />}
              </Modal.Icon>
              <div>
                <Modal.Heading>{isPromoting ? "Promote to Admin" : "Revoke Admin Access"}</Modal.Heading>
              </div>
            </Modal.Header>
            
            <Modal.Body>
              <div className="py-2 text-sm text-slate-600">
                {isPromoting ? (
                  <p>
                    Are you sure you want to grant <strong>{user.name}</strong> full administrative privileges? They will have complete access to the platforms backend tools and user data.
                  </p>
                ) : (
                  <p>
                    Are you sure you want to demote <strong>{user.name}</strong>? They will lose all dashboard access and be returned to a standard patient role.
                  </p>
                )}
              </div>
            </Modal.Body>

            <Modal.Footer className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 font-bold" 
                onClick={onClose}
                isDisabled={isProcessing}
              >
                Cancel
              </Button>
              <Button 
                className={`flex-1 font-bold text-white shadow-sm ${isPromoting ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600"}`}
                isDisabled={isProcessing}
                onClick={() => onConfirm(user._id, targetRole)}
              >
                {isPromoting ? "Confirm Promotion" : "Confirm Demotion"}
              </Button>
            </Modal.Footer>
            
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}