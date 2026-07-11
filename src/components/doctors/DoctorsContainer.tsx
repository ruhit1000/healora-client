"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Pagination, Drawer, Button } from "@heroui/react";
import DoctorCard from "./DoctorCard";
import FilterSidebarContent from "./FilterSidebarContent";
import { DoctorCardData } from "@/lib/api/doctors";

interface DoctorsContainerProps {
  initialData: DoctorCardData[];
  meta?: { totalPages: number; currentPage: number; totalDoctors: number };
  initialFilters: { search: string; specialty: string; page: number };
  availableSpecialties: string[];
}

export default function DoctorsContainer({ 
  initialData, 
  meta, 
  initialFilters, 
  availableSpecialties 
}: DoctorsContainerProps) {
  const router = useRouter();
  const [search, setSearch] = useState(initialFilters.search);
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialFilters.specialty);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const totalPages = meta?.totalPages || 1;
  const currentPage = meta?.currentPage || 1;

  const updateQueryParams = (updatedFilters: { search?: string; specialty?: string; page?: number }) => {
    const params = new URLSearchParams();
    
    const searchVal = updatedFilters.search !== undefined ? updatedFilters.search : search;
    const specialtyVal = updatedFilters.specialty !== undefined ? updatedFilters.specialty : selectedSpecialty;
    const pageVal = updatedFilters.page !== undefined ? updatedFilters.page : 1;

    if (searchVal) params.set("search", searchVal);
    if (specialtyVal) params.set("specialty", specialtyVal);
    if (pageVal > 1) params.set("page", pageVal.toString());

    router.push(`/doctors?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateQueryParams({ page: 1 });
  };

  const handleSpecialtySelect = (specialty: string) => {
    const targetSpecialty = selectedSpecialty === specialty ? "" : specialty;
    setSelectedSpecialty(targetSpecialty);
    updateQueryParams({ specialty: targetSpecialty, page: 1 });
  };

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    pages.push(1);
    if (currentPage > 3) pages.push("ellipsis");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* 1. TOP BAR CONTROLS */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white p-4 rounded-healora border border-slate-100 shadow-xs">
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doctors by name..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-healora text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-medium"
          />
        </form>

        <div className="md:hidden">
          <Button
            variant="secondary"
            className="rounded-healora font-bold text-xs"
            onPress={() => setIsMobileFilterOpen(true)}
          >
            Filters
          </Button>
        </div>
      </div>

      {/* 2. MAIN GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden md:block md:col-span-3 bg-white p-5 rounded-healora border border-slate-100 shadow-xs sticky top-4">
          <FilterSidebarContent 
            selectedSpecialty={selectedSpecialty} 
            onSelectSpecialty={handleSpecialtySelect} 
            specialties={availableSpecialties}
          />
        </aside>

        {/* HERO UI MOBILE FILTER DRAWER */}
        <Drawer isOpen={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />
                <Drawer.Header>
                  <Drawer.Heading className="text-sm font-black text-slate-800">Filter Directories</Drawer.Heading>
                </Drawer.Header>
                <Drawer.Body>
                  <FilterSidebarContent 
                    selectedSpecialty={selectedSpecialty} 
                    onSelectSpecialty={handleSpecialtySelect} 
                    specialties={availableSpecialties}
                  />
                </Drawer.Body>
                <Drawer.Footer>
                  <Button slot="close" variant="secondary" className="rounded-lg text-xs font-bold">
                    Close
                  </Button>
                </Drawer.Footer>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>

        {/* 3. CARDS RESULTS SECTOR */}
        <main className="md:col-span-9 space-y-6">
          {initialData.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-healora p-12 text-center text-slate-400 text-xs font-medium shadow-xs">
              No matching clinical profiles located. Try adjustments to criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {initialData.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          )}

          {/* HERO UI PAGINATION ENGINE */}
          {totalPages > 1 && (
            <div className="w-full overflow-x-auto pt-4 flex justify-center">
              <Pagination className="justify-center">
                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous 
                      isDisabled={currentPage === 1} 
                      onPress={() => updateQueryParams({ page: currentPage - 1 })}
                    >
                      <Pagination.PreviousIcon />
                      <span className="text-xs font-bold">Previous</span>
                    </Pagination.Previous>
                  </Pagination.Item>
                  
                  {getPageNumbers().map((p, i) =>
                    p === "ellipsis" ? (
                      <Pagination.Item key={`ellipsis-${i}`}>
                        <Pagination.Ellipsis />
                      </Pagination.Item>
                    ) : (
                      <Pagination.Item key={p}>
                        <Pagination.Link 
                          isActive={p === currentPage} 
                          onPress={() => updateQueryParams({ page: p })}
                          className="text-xs font-bold"
                        >
                          {p}
                        </Pagination.Link>
                      </Pagination.Item>
                    )
                  )}

                  <Pagination.Item>
                    <Pagination.Next 
                      isDisabled={currentPage === totalPages} 
                      onPress={() => updateQueryParams({ page: currentPage + 1 })}
                    >
                      <span className="text-xs font-bold">Next</span>
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}