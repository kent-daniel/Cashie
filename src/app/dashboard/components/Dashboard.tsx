"use client";
import React, { useState } from "react";
import { Company } from "../actions";
import Dropdown from "@/components/dropdown";
import { BookCheck, BookUpIcon } from "lucide-react";
import Link from "next/link";

export const Dashboard = ({ companies }: { companies: Company[] }) => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const handleSelect = (companyId: string) => {
    setSelectedCompany(companyId);
  };
  return (
    <>
      <div className="w-1/3 gap-2 text-center mb-8 flex items-center">
        <p className="text-lg font-semibold w-2/3">Pilih perusahaan:</p>
        <Dropdown
          options={companies.map((company) => ({
            label: company.name,
            value: company.id.toString(),
          }))}
          onSelect={(option) => handleSelect(option)}
        />
      </div>
      <div className="flex justify-center items-center gap-8 text-emerald-300">
        <Link
          href={
            selectedCompany ? `dashboard/${selectedCompany}/buku-kecil` : "#"
          }
        >
          <button
            className="p-4 text-lg font-bold flex flex-col items-center gap-3 border border-emerald-900 rounded-lg hover:bg-emerald-950"
            disabled={!selectedCompany}
          >
            <BookCheck size={64} />
            <span>Buku Kecil</span>
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
