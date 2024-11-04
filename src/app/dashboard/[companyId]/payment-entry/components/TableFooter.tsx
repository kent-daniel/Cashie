import React from "react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import PageSizeSelector from "./page-size-selector";

interface TableFooterProps<T> {
  table: Table<T>;
}

const TableFooter = <T,>({ table }: TableFooterProps<T>): JSX.Element => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4 px-2">
      <p>Tampilkan baris:</p>
      <PageSizeSelector table={table} className="fl" />
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredRowModel().rows.length} hasil.
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TableFooter;
