"use client";

import { useState } from "react";
import { X, ChevronDown, Search, Loader2 } from "lucide-react";

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

export function SearchBar({
  filter,
  query,
}: {
  filter: string;
  query: string;
}) {
  const router = useRouter();
  const [searchText, setSearchText] = useState(query);
  const [selectedFilter, setSelectedFilter] = useState(filter);
  const [isSearching, setIsSearching] = useState(false);

  const handleClear = () => {
    setSearchText("");
    router.push(window.location.pathname); // Removes all query params
  };

  const handleSearch = async () => {
    setIsSearching(true);
    const queryString = new URLSearchParams({
      query: searchText,
      filter: selectedFilter,
    }).toString();
    router.push(`?${queryString}`);
    setIsSearching(false);
  };

  const handleOnInput = (input: string) => {
    setSearchText(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative flex  items-center mx-auto mt-7 space-x-3 bg-zinc-800 p-3 rounded-md">
      <div className="flex items-center bg-primary-foreground px-3 rounded-md">
        <input
          type="text"
          placeholder="Cari nama atau kode..."
          value={searchText}
          onChange={(e) => handleOnInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-14 h-12 bg-primary-foreground ring-0 focus:outline-none focus:ring-offset-0 border-none"
        />

        <Button
          variant="ghost"
          size="icon"
          className={`bg-primary-foreground ${
            searchText ? "opacity-100 cursor-pointer" : "opacity-0 cursor-text"
          }`}
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-12 bg-primary-foreground flex items-center justify-between"
          >
            {selectedFilter || "Filter"}
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {filterOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setSelectedFilter(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        className="h-12 px-4 bg-emerald-700 hover:bg-emerald-600 text-white border-none"
        onClick={handleSearch}
        disabled={isSearching}
      >
        {isSearching ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Search className="mr-2 h-5 w-5" />
        )}
        Search
      </Button>
    </div>
  );
}
