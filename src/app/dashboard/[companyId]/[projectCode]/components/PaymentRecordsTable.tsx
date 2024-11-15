"use client";
import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaymentRow } from "../actions";
import { getPaymentRecordsColumns } from "./PaymentRecordsColumns";
import TableFooter from "../../payment-entry/components/TableFooter";

export function PaymentRecordsTable({
  data,
  nilaiProyek,
  RAB,
}: {
  data: PaymentRow[];
  nilaiProyek: string;
  RAB: string;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns: ColumnDef<PaymentRow>[] = getPaymentRecordsColumns(
    nilaiProyek,
    RAB
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Calculate totals for debit and credit columns
  const totals = React.useMemo(() => {
    return data.reduce(
      (acc, row) => {
        acc.debitAmount += row.debitAmount || 0;
        acc.creditAmount += row.creditAmount || 0;
        return acc;
      },
      { debitAmount: 0, creditAmount: 0 }
    );
  }, [data]);

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className="text-center border"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
            {/* Totals Row */}
            <TableRow className="font-semibold text-2xl">
              <TableCell colSpan={2} className="text-center border">
                Totals
              </TableCell>
              <TableCell className="text-left border">
                {new Intl.NumberFormat("id", {
                  style: "currency",
                  currency: "IDR",
                }).format(totals.debitAmount)}
              </TableCell>
              <TableCell className="text-left border" />
              <TableCell className="text-left border">
                {new Intl.NumberFormat("id", {
                  style: "currency",
                  currency: "IDR",
                }).format(totals.creditAmount)}
              </TableCell>
              <TableCell className="text-left border" />
              <TableCell className="text-left border" />
            </TableRow>
          </TableBody>
        </Table>
        <TableFooter table={table} />
      </div>
    </div>
  );
}
