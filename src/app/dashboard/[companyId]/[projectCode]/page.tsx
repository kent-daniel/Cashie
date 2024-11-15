import React from "react";
import { fetchProjectPaymentRows, getProjectByCode } from "./actions";
import { PaymentRecordsTable } from "./components/PaymentRecordsTable";
import { formatCurrency } from "../../utils";
import ProjectCard from "./components/ProjectCard";

import DatePicker from "../payment-entry/components/date-picker";
import { ExportToCsvButton } from "./components/ExportToCsvButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProjectMenu } from "./components/containers/ProjectMenu";

// Server Component
const Page = async ({
  params,
  searchParams,
}: {
  params: { projectCode: string };
  searchParams: { startDate?: string; endDate?: string };
}) => {
  const { startDate = "", endDate = "" } = searchParams;
  const paymentRows = await fetchProjectPaymentRows(
    params.projectCode,
    startDate,
    endDate
  );
  const { project } = await getProjectByCode(params.projectCode);

  if (!project) return <></>;

  return (
    <div className="p-8 gap-5 flex flex-col">
      <ProjectCard project={project} />
      <ProjectMenu project={project} />
      <div className="flex justify-between">
        <DatePicker />
        <ExportToCsvButton
          projectCode={project.projectCode}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <PaymentRecordsTable
        data={paymentRows}
        nilaiProyek={formatCurrency(Number(project.projectValue).toString())}
        RAB={formatCurrency(Number(project.estimationBudget).toString())}
      />
      <ToastContainer />
    </div>
  );
};

export default Page;
