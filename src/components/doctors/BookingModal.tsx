"use client";

import React, { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { DetailedDoctorSchema } from "@/lib/api/doctors";
import CalendarSelector from "./booking/CalendarSelector";
import TimeSlotGrid from "./booking/TimeSlotGrid";

interface BookingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: DetailedDoctorSchema;
}

export default function BookingModal({ isOpen, onOpenChange, doctor }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

const handleModalStateChange = (open: boolean) => {
  if (!open) {
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  }
  onOpenChange(open); // Pass the instruction back up to the parent Container
};

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); 
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTimeSlot) return;
    
    const bookingPayload = {
      doctorId: doctor._id,
      appointmentDate: selectedDate,
      appointmentTime: selectedTimeSlot,
    };
    
    console.log("Transmitting payload:", bookingPayload);
    alert(`Success! Booking confirmed for ${selectedDate} at ${selectedTimeSlot}.`);
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleModalStateChange}>
      <Modal.Backdrop>
        <Modal.Container>
          {/* Main Dialog wrapper - added standard sizing and styling here */}
          <Modal.Dialog className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden mx-4">
            
            <Modal.CloseTrigger className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors z-10" />

            <Modal.Header className="flex flex-col gap-1 border-b border-slate-100 p-6 pb-4">
              <Modal.Heading className="text-base font-black text-slate-800">
                Select Appointment Slot
              </Modal.Heading>
              <p className="text-xs text-slate-500 font-medium">Consultation with {doctor.name}</p>
            </Modal.Header>

            <Modal.Body className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* STAGE 3 Engine */}
              <CalendarSelector 
                doctor={doctor} 
                selectedDate={selectedDate} 
                onSelectDate={handleDateChange} 
              />

              <hr className="border-slate-100" />

              {/* STAGE 4 Engine */}
              <TimeSlotGrid 
                doctor={doctor} 
                selectedDate={selectedDate} 
                selectedTimeSlot={selectedTimeSlot} 
                onSelectTimeSlot={setSelectedTimeSlot} 
              />
            </Modal.Body>

            <Modal.Footer className="border-t border-slate-100 p-6 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
              <div className="text-xs font-bold text-slate-500">
                Selected: <span className="text-slate-800 font-black ml-1">
                  {selectedDate && selectedTimeSlot ? `${selectedDate} @ ${selectedTimeSlot}` : "None"}
                </span>
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                {/* HeroUI Button: Variant Outline */}
                <Button 
                  variant="outline" 
                  onPress={() => handleModalStateChange(false)}
                  className="font-bold text-xs px-4 flex-1 sm:flex-none cursor-pointer"
                >
                  Cancel
                </Button>

                {/* HeroUI Button: Default Primary */}
                <Button 
                  isDisabled={!selectedDate || !selectedTimeSlot}
                  onPress={handleConfirm}
                  className="font-bold text-xs px-6 flex-1 sm:flex-none cursor-pointer"
                >
                  Confirm Booking
                </Button>
              </div>
            </Modal.Footer>
            
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}