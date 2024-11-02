import React from "react";
import { PaymentTable } from "./components/data-table";
import PaymentForm from "./components/input-form";
import { getPayments } from "./actions";

const page = async ({ params }: { params: { companyId: string } }) => {
  const payments = await getPayments(params.companyId);
  return (
    <div className="p-10">
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
