import React from "react";
import { fetchProjectPaymentRows, getProjectByCode } from "./actions";
import { PaymentRecordsTable } from "./components/PaymentRecordsTable";
import { formatCurrency } from "../../utils";
import ProjectCard from "./components/ProjectCard";
import { ProjectChart } from "./components/ProjectChart";

const page = async ({ params }: { params: { projectCode: string } }) => {
  const paymentRows = await fetchProjectPaymentRows(params.projectCode);
  const { project } = await getProjectByCode(params.projectCode);
  if (!project) return <></>;
  return (
    <div>
      <ProjectCard project={project} />
      <ProjectChart project={project} />
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
