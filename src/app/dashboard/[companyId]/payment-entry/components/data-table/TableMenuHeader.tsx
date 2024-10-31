import { Button } from "@/components/ui/button";
import { ChartColumnIcon } from "lucide-react";
import React from "react";
import ProjectFilterInput from "../project-filter-input";
import { ColumnFiltersState, Table } from "@tanstack/react-table";
import {
  PaymentPresentationDTO,
  Stats,
  getStatsByProjectCode,
} from "../../actions";

const TableMenu = ({
  table,
  columnFilters,
}: {
  table: Table<PaymentPresentationDTO>;
  columnFilters: ColumnFiltersState;
}) => {
  const [stats, setStats] = React.useState<Stats>({
    totalDebit: "",
    totalCredit: "",
  });

  const fetchTotalDebitCredit = async (filters: ColumnFiltersState) => {
    try {
      if (filters[0].id !== "projectCode") return;

      const stats = await getStatsByProjectCode(filters[0].value as string);
      if (!stats) return;
      setStats(stats);
    } catch (error) {
      console.error("Error fetching filtered payments:", error);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-6 items-center py-4">
      <div className="flex gap-3">
        <ProjectFilterInput table={table} />
        <Button
          variant={"outline"}
          className="gap-2"
          onClick={() => fetchTotalDebitCredit(columnFilters)}
        >
          Get Stats <ChartColumnIcon size={15} />
        </Button>
      </div>
      <div>
        {!(
          stats.totalCredit === undefined && stats.totalDebit === undefined
        ) && (
          <div>
            <span className="text-red-500">Credit: {stats.totalCredit}</span>
            <span className="ml-4 text-green-500">
              Debit: {stats.totalDebit}
            </span>
          </div>
        )}
      </div>

      <div className="w-full sm:w-3/12 sm:min-w-[350px]">
        {/* <DatePicker setDateRange={} /> */}
      </div>
    </div>
  );
};

export default TableMenu;
