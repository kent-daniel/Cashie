"use client";

import * as React from "react";
import {
  ColumnDef,
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
import {
  ArrowUpDown,
  ChartColumnIcon,
  MoreHorizontal,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PaymentPresentationDTO,
  Stats,
  getStatsByProjectCode,
} from "./actions";
import ProjectFilterInput from "./components/project-filter-input";
import TableFooter from "./components/TableFooter";

export const columns: ColumnDef<PaymentPresentationDTO>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase p-2">
        {(row.getValue("date") as Date).toLocaleDateString()}
      </div>
    ),
  },

  {
    accessorKey: "projectCode",
    header: () => <p>Kode Project</p>,
    cell: ({ row }) => {
      const projectCode = row.getValue("projectCode") as string;
      return (
        <div
          className="text-start cursor-pointer underline underline-offset-4"
          onClick={() => {
            // Query select by id to set the filter value for the input
            const inputElement = document.getElementById(
              "projectCodeFilterInput"
            ) as HTMLInputElement;
            if (inputElement) {
              // Create an event that triggers the 'input' change
              const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "value"
              )?.set;

              if (nativeInputValueSetter) {
                nativeInputValueSetter.call(inputElement, projectCode); // Set the value of the input

                // Create and dispatch the event to simulate a user input change
                const event = new Event("input", { bubbles: true });
                inputElement.dispatchEvent(event);
              }
            }
          }}
        >
          {projectCode}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: () => {
      return <p>Deskripsi</p>;
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("description")}</div>
    ),
  },

  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Biaya
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("id", {
        style: "currency",
        currency: "IDR",
      }).format(amount);

      return <div className="text-start">{formatted}</div>;
    },
  },
  {
    accessorKey: "category",
    header: () => (
      <div>
        <span>Kategori</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className={`text-center`}>
        <p
          className={`rounded-xl font-semibold border ${
            row.getValue("category") === "debit"
              ? "bg-green-100 text-green-500 border-green-500 dark:bg-green-700/50 dark:text-green-500 dark:border-green-500"
              : row.getValue("category") === "credit"
              ? "bg-red-100 text-red-500 border-red-500 dark:bg-red-900/70 dark:text-red-500 dark:border-red-500"
              : "bg-yellow-100 text-yellow-500 border-yellow-500 dark:bg-yellow-700/50 dark:text-yellow-500 dark:border-yellow-500" // Style for saldo
          }`}
        >
          {row.getValue("category")}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => {
      return <p>Pencatat</p>;
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(payment.projectCode);
              }}
            >
              Copy kode project
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function PaymentTable({ data }: { data: PaymentPresentationDTO[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [stats, setStats] = React.useState<Stats>({
    totalDebit: 0,
    totalCredit: 0,
  });

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
        pageSize: 20,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
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
    <div className="w-full">
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
          {!(stats.totalCredit === 0 && stats.totalDebit === 0) && (
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
                    <TableCell key={cell.id}>
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TableFooter table={table} />
    </div>
  );
}
