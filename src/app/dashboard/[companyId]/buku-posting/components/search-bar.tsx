"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const filterOptions = [
  { value: "active", label: "Aktif" },
  { value: "completed", label: "Selesai" },
  { value: "all", label: "Semua" },
];

export function SearchBar() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleClear = () => {
    setSearchText("");
    router.push(window.location.pathname); // This removes all query params
  };

  const handleOnInput = (input: string) => {
    setSearchText(input);
    const queryString = new URLSearchParams({
      query: input,
      filter: selectedFilter,
    }).toString();

    router.push(`?${queryString}`);
  };

  return (
    <div className="relative flex w-full max-w-md items-center mx-auto mt-5">
      <Input
        type="text"
        placeholder="Cari..."
        value={searchText}
        onChange={(e) => handleOnInput(e.target.value)}
        className="pr-20 bg-primary-foreground h-12 text-lg" // Made input taller and text larger
      />
      {searchText && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-20 top-1/2 -translate-y-1/2"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            {selectedFilter || "Filter"}{" "}
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {filterOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setSelectedFilter(option.label)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
