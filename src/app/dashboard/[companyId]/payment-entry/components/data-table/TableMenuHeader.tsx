import React from "react";
import ProjectFilterInput from "../project-filter-input";
import { Table } from "@tanstack/react-table";
import { PaymentPresentationDTO } from "../../actions";

const TableMenu = ({ table }: { table: Table<PaymentPresentationDTO> }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-6 items-center py-4">
      <div className="flex gap-3">
        <ProjectFilterInput table={table} />
      </div>
    </div>
  );
};

export default TableMenu;
