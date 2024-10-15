"use client";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DatePicker = () => {
  const [value, setValue] = useState({
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
      onChange={(newValue) => setValue(newValue)}
      showShortcuts={true}
    />
  );
};

export default DatePicker;
