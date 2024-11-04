import React from "react";
import { fetchProjectPaymentRows } from "./actions";
import { PaymentRecordsTable } from "./components/PaymentRecordsTable";

const page = async ({ params }: { params: { projectCode: string } }) => {
  const paymentRows = await fetchProjectPaymentRows(params.projectCode);

  return (
    <div>
      <PaymentRecordsTable data={paymentRows} />
    </div>
  );
};

export default page;
