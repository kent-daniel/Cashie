import React from "react";
import { fetchProjectPaymentRows } from "./actions";
import { PaymentRecordsTable } from "./components/PaymentRecordsTable";
import { fetchProjectByCode } from "@/data-access/projects";
import { formatCurrency } from "../../utils";

const page = async ({ params }: { params: { projectCode: string } }) => {
  const paymentRows = await fetchProjectPaymentRows(params.projectCode);
  const { project } = await fetchProjectByCode(params.projectCode);
  if (!project) return <></>;
  return (
    <div>
      <div className="m-7">
        <PaymentRecordsTable
          data={paymentRows}
          nilaiProyek={formatCurrency(Number(project.projectValue).toString())}
          RAB={formatCurrency(Number(project.estimationBudget).toString())}
        />
      </div>
    </div>
  );
};

export default page;
