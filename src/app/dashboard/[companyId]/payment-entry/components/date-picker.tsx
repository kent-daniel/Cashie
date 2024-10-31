"use client";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
export type DateRange = {
  startDate: null | Date;
  endDate: null | Date;
};
const DatePicker = ({
  setDateRange,
}: {
  setDateRange: (dateRange: DateRange) => void;
}) => {
  const [value, setValue] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  return (
    <Datepicker
      i18n={"fr"}
      primaryColor={"emerald"}
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
      onChange={(newValue) => {
        setValue(newValue as DateRange);
        setDateRange(newValue as DateRange);
      }}
      showShortcuts={true}
    />
  );
};

export default DatePicker;
