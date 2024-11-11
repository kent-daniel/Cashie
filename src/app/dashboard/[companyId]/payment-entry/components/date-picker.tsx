"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Datepicker from "react-tailwindcss-datepicker";
import { Button } from "@/components/ui/button";

export type DateRange = {
  startDate: null | Date;
  endDate: null | Date;
};

const DatePicker = () => {
  const router = useRouter();
  const [value, setValue] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (newValue: DateRange) => {
    setValue(newValue);

    const startDate = newValue.startDate
      ? new Date(newValue.startDate).toISOString().split("T")[0]
      : null;
    const endDate = newValue.endDate
      ? new Date(newValue.endDate).toISOString().split("T")[0]
      : null;

    // Update the URL with new start and end dates
    if (startDate && endDate) {
      const queryString = new URLSearchParams({
        startDate,
        endDate,
      }).toString();
      console.log(startDate, endDate);
      router.push(`?${queryString}`);
    }
  };

  const handleResetFilters = () => {
    // Reset the URL by removing query parameters
    router.push(window.location.pathname); // This removes all query params
  };

  return (
    <div className="flex justify-end gap-3 w-1/2">
      <Datepicker
        i18n="id"
        primaryColor="emerald"
        inputClassName="w-full rounded-md bg-transparent border text-white dark:bg-primary-foreground dark:border-0 p-2"
        popoverDirection="down"
        placeholder="Pilih Tanggal"
        configs={{
          shortcuts: {
            today: "Hari ini",
            yesterday: "Kemarin",
            past: (period) => period + " hari terakhir",
            currentMonth: "Bulan ini",
            pastMonth: "Bulan lalu",
          },
        }}
        value={value}
        onChange={(newValue) => handleDateChange(newValue as DateRange)}
        showShortcuts={true}
      />
      <Button onClick={handleResetFilters}>Reset pilihan tanggal</Button>
    </div>
  );
};

export default DatePicker;
