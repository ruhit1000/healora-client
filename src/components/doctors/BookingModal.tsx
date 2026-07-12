"use client";

import React, { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { DetailedDoctorSchema } from "@/lib/api/doctors";
import CalendarSelector from "./booking/CalendarSelector";
import TimeSlotGrid from "./booking/TimeSlotGrid";
import { initializeCheckout } from "@/lib/actions/booking";
import { useRouter } from "next/navigation";

interface CurrentUser {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface BookingModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    doctor: DetailedDoctorSchema;
    currentUser?: CurrentUser | null;
}

export default function BookingModal({ isOpen, onOpenChange, doctor, currentUser }: BookingModalProps) {
    const router = useRouter();
    // Navigation State
    const [step, setStep] = useState<"selection" | "intake">("selection");
    const [isProcessing, setIsProcessing] = useState(false);

    // Booking Data State
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

    // Intake Form State
    const [patientName, setPatientName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [reason, setReason] = useState("");

    // Reset everything when the modal opens/closes
    const handleModalStateChange = (open: boolean) => {
        if (!open) {
            setStep("selection");
            setSelectedDate(null);
            setSelectedTimeSlot(null);
            setPatientName("");
            setAge("");
            setGender("");
            setReason("");
        }
        onOpenChange(open);
    };

    // Pre-fill the name when moving to the intake step
    const handleProceedToIntake = () => {
        if (currentUser?.name) {
            setPatientName(currentUser.name);
        }
        setStep("intake");
    };

    const handleFinalCheckout = async () => {
        setIsProcessing(true);

        try {
            const checkoutPayload = {
                doctorId: doctor._id,
                patientUserId: currentUser?.id,
                appointmentDate: selectedDate,
                appointmentTime: selectedTimeSlot,
                intake: { patientName, age, gender, reason }
            };

            // Call your new server action
            const response = await initializeCheckout(checkoutPayload);

            if (response.success && response.url) {
                // 🚀 BOOM: Redirect the user securely to the Stripe Checkout page
                router.push(response.url);
            } else {
                alert(response.message || "Failed to initialize checkout. Please try again.");
                setIsProcessing(false);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("A network error occurred. Please check your connection and try again.");
            setIsProcessing(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={handleModalStateChange}>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden mx-4">

                        <Modal.CloseTrigger className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors z-10" />

                        <Modal.Header className="flex flex-col gap-1 border-b border-slate-100 p-6 pb-4">
                            <Modal.Heading className="text-base font-black text-slate-800">
                                {step === "selection" ? "Select Appointment Slot" : "Patient Details"}
                            </Modal.Heading>
                            <p className="text-xs text-slate-500 font-medium">Consultation with {doctor.name}</p>
                        </Modal.Header>

                        <Modal.Body className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">

                            {/* ==========================================
                  STEP 1: DATE & TIME SELECTION
                  ========================================== */}
                            {step === "selection" && (
                                <div className="space-y-6 animate-fadeIn">
                                    <CalendarSelector
                                        doctor={doctor}
                                        selectedDate={selectedDate}
                                        onSelectDate={(date) => { setSelectedDate(date); setSelectedTimeSlot(null); }}
                                    />
                                    <hr className="border-slate-100" />
                                    <TimeSlotGrid
                                        doctor={doctor}
                                        selectedDate={selectedDate}
                                        selectedTimeSlot={selectedTimeSlot}
                                        onSelectTimeSlot={setSelectedTimeSlot}
                                    />
                                </div>
                            )}

                            {/* ==========================================
                  STEP 2: INTAKE FORM
                  ========================================== */}
                            {step === "intake" && (
                                <div className="space-y-4 animate-fadeIn">
                                    <div className="bg-brand-primary/5 border border-brand-primary/20 p-4 rounded-xl flex justify-between items-center">
                                        <div>
                                            <p className="text-[10px] text-brand-primary font-bold uppercase">Reserved Slot</p>
                                            <p className="text-sm font-black text-slate-800">{selectedDate} @ {selectedTimeSlot}</p>
                                        </div>
                                        <button onClick={() => setStep("selection")} className="text-xs font-bold text-slate-500 hover:text-brand-primary underline cursor-pointer">
                                            Change Time
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs font-bold text-slate-700">Patient Name</label>
                                            <input
                                                type="text"
                                                value={patientName}
                                                onChange={(e) => setPatientName(e.target.value)}
                                                placeholder="Enter patient's full name"
                                                className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-primary transition-colors"
                                            />
                                            <p className="text-[10px] text-slate-400 mt-1 font-medium">You can change this if booking for a relative.</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-slate-700">Age</label>
                                                <input
                                                    type="number"
                                                    value={age}
                                                    onChange={(e) => setAge(e.target.value)}
                                                    placeholder="e.g. 34"
                                                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-primary transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-700">Gender</label>
                                                <select
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-primary transition-colors appearance-none cursor-pointer"
                                                >
                                                    <option value="" disabled>Select gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-700">Reason for Visit <span className="text-slate-400 font-normal">(Optional)</span></label>
                                            <textarea
                                                value={reason}
                                                onChange={(e) => setReason(e.target.value)}
                                                placeholder="Briefly describe the symptoms or reason for consultation..."
                                                rows={3}
                                                className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-primary transition-colors resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                        </Modal.Body>

                        <Modal.Footer className="border-t border-slate-100 p-6 pt-4 flex flex-col sm:flex-row justify-between items-center w-full gap-4">
                            <div className="text-xs font-bold text-slate-500 w-full sm:w-auto text-center sm:text-left">
                                Consultation Fee: <span className="text-slate-800 font-black text-lg ml-1">৳{doctor.fee}</span>
                            </div>

                            <div className="flex gap-2 w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    onPress={() => handleModalStateChange(false)}
                                    className="font-bold text-xs px-4 flex-1 sm:flex-none cursor-pointer"
                                >
                                    Cancel
                                </Button>

                                {step === "selection" ? (
                                    <Button
                                        isDisabled={!selectedDate || !selectedTimeSlot}
                                        onPress={handleProceedToIntake}
                                        className="font-bold text-xs px-6 flex-1 sm:flex-none cursor-pointer bg-slate-800 text-white"
                                    >
                                        Continue
                                    </Button>
                                ) : (
                                    <Button
                                        isDisabled={!patientName || !age || !gender || isProcessing}
                                        onPress={handleFinalCheckout}
                                        className="font-bold text-xs px-6 flex-1 sm:flex-none cursor-pointer bg-brand-primary text-white"
                                    >
                                        {isProcessing ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : (
                                            "Proceed to Payment"
                                        )}
                                    </Button>
                                )}
                            </div>
                        </Modal.Footer>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}