"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { generateCsv, download } from "export-to-csv";
import { getCsvDataFormat } from "../actions";
import { FileSpreadsheetIcon } from "lucide-react";

interface ExportToCsvButtonProps {
  projectCode: string;
  startDate?: string;
  endDate?: string;
}

export const ExportToCsvButton: React.FC<ExportToCsvButtonProps> = ({
  projectCode,
  startDate,
  endDate,
}) => {
  const handleExport = async () => {
    try {
      // Define mock data to export
      const response = await getCsvDataFormat(projectCode, startDate, endDate);

      // Configure CSV export options
      const { csvConfig, csvData } = await JSON.parse(response);

      // Generate and download CSV file
      const csv = generateCsv(csvConfig)(csvData);
      download(csvConfig)(csv);
    } catch (error) {
      console.error("Failed to export data to CSV:", error);
    }
  };

  return (
    <Button
      onClick={handleExport}
      className="bg-emerald-600 text-white hover:bg-emerald-800 hover:border-emerald-600/80 border border-x-0 border-y-0 border-t border-emerald-300"
    >
      Export ke CSV/Excel <FileSpreadsheetIcon />
    </Button>
  );
};
