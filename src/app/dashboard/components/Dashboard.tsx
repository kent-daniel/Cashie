"use client";
import React, { useState, useEffect } from "react";
import { Company } from "../actions";
import { BookCheck, BookUpIcon } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export const Dashboard = ({ companies }: { companies: Company[] }) => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  // Set default to the first company
  useEffect(() => {
    if (companies.length > 0) {
      setSelectedCompany(companies[0].id.toString());
    }
  }, [companies]);

  const handleSelect = (companyId: string) => {
    setSelectedCompany(companyId);
  };

  return (
    <>
      <div className="w-1/3 gap-2 text-center mb-8 flex items-center">
        <p className="text-lg font-semibold w-2/3">Pilih perusahaan:</p>
        <Select onValueChange={handleSelect} value={selectedCompany!}>
          <SelectTrigger className="w-full p-2 border border-gray-300 rounded-lg">
            <SelectValue placeholder="Select a company" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.id.toString()}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-center items-center gap-8 text-emerald-300">
        <Link
          href={
            selectedCompany ? `dashboard/${selectedCompany}/buku-posting` : "#"
          }
        >
          <button
            className="p-4 text-lg font-bold flex flex-col items-center gap-3 border border-emerald-900 rounded-lg hover:bg-emerald-950"
            disabled={!selectedCompany}
          >
            <BookCheck size={64} />
            <span>Buku posting</span>
          </button>
        </Link>
        <Link
          href={
            selectedCompany ? `dashboard/${selectedCompany}/payment-entry` : "#"
          }
        >
          <button
            className="p-4 text-lg font-bold flex flex-col items-center gap-3 border border-emerald-900 rounded-lg hover:bg-emerald-950"
            disabled={!selectedCompany}
          >
            <BookUpIcon size={64} />
            <span>Buku Besar</span>
          </button>
        </Link>
      </div>
    </>
  );
};
