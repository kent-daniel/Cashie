import React from "react";
import { PaymentTable } from "./components/data-table";
import PaymentForm from "./components/input-form";
import { getPayments } from "./actions";
import { BackToDashboardButton } from "../../components/BackToDashboardButton";

const page = async () => {
  const payments = await getPayments();
  return (
    <div className="p-10">
      <BackToDashboardButton />
      <h1 className="text-2xl font-bold text-center mt-6">
        {new Intl.DateTimeFormat("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        }).format(new Date())}
      </h1>
      <PaymentForm />
      <PaymentTable data={payments} />
    </div>
  );
};

export default page;
