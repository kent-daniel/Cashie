import React from "react";
import { DataTableDemo } from "./data-table";
import PaymentForm from "./components/input-form";

const page = () => {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-center ">
        {new Intl.DateTimeFormat("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        }).format(new Date())}
      </h1>
      <PaymentForm />
      <DataTableDemo />
    </div>
  );
};

export default page;
