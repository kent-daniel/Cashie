import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PaymentPresentationDTO } from "../actions";

interface ProjectFilterInputProps {
  table: Table<PaymentPresentationDTO>;
}

const ProjectFilterInput: React.FC<ProjectFilterInputProps> = ({ table }) => {
  const [inputValue, setInputValue] = useState<string>(
    (table.getColumn("projectCode")?.getFilterValue() as string) ?? ""
  );

  // Effect to handle input changes with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      table.getColumn("projectCode")?.setFilterValue(inputValue);
    }, 300); // Adjust the delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, table]); // Dependency array

  return (
    <div className="relative w-full sm:w-auto">
      <Input
        id="projectCodeFilterInput"
        placeholder="Cari kode project..."
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value); // Update local state
        }}
        className="w-full max-w-sm pr-10"
      />
      <button
        className="absolute inset-y-0 right-0 px-2 py-1 text-gray-500/50 hover:text-gray-500"
        onClick={() => {
          setInputValue(""); // Clear local state
          table.getColumn("projectCode")?.setFilterValue(""); // Clear filter
        }}
      >
        <XIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ProjectFilterInput;
