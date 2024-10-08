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
import { ArrowUpDown, ChevronDown, MoreHorizontal, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Payment[] = [
  {
    amount: 316000,

    email: "ken99@yahoo.com",
    projectCode: "PC001", // Added projectCode
    category: "credit", // Added category
    date: new Date("2023-01-01"), // Added date
  },
  {
    amount: 242000,

    email: "Abe45@gmail.com",
    projectCode: "PC002", // Added projectCode
    category: "debit", // Added category
    date: new Date("2023-01-02"), // Added date
  },
  {
    amount: 83007,
    email: "Monserrat44@gmail.com",
    projectCode: "PC003", // Added projectCode
    category: "credit", // Added category
    date: new Date("2023-01-03"), // Added date
  },
  {
    amount: 8704,
    email: "Silas22@gmail.com",
    projectCode: "PC004", // Added projectCode
    category: "debit", // Added category
    date: new Date("2023-01-04"), // Added date
    description: "Pembayaran untuk proyek PC004", // Added description
  },
  {
    amount: 72100,
    email: "carmella@hotmail.com",
    projectCode: "PC005", // Added projectCode
    category: "credit", // Added category
    date: new Date("2023-01-05"), // Added date
    description: "Pembayaran untuk proyek PC001", // Added description
  },
];

export type Payment = {
  projectCode: string;
  amount: number;
  description?: string;
  category: "debit" | "credit";
  date: Date;
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "date",
    header: () => {
      return <p>Tanggal</p>;
    },
    cell: ({ row }) => (
      <div className="lowercase">
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
              : "bg-red-100 text-red-500 border-red-500 dark:bg-red-900/70 dark:text-red-500 dark:border-red-500"
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
              onClick={() => navigator.clipboard.writeText(payment.projectCode)}
            >
              Copy payment ID
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

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="relative">
          <Input
            id="projectCodeFilterInput"
            placeholder="Cari kode project..."
            value={
              (table.getColumn("projectCode")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) => {
              console.log(event);
              table
                .getColumn("projectCode")
                ?.setFilterValue(event.target.value);
            }}
            className="max-w-sm pr-10"
          />
          <button
            className="absolute inset-y-0 right-0 px-2 py-1 text-gray-500/50 hover:text-gray-500"
            onClick={() => {
              table.getColumn("projectCode")?.setFilterValue("");
            }}
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
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
    </div>
  );
}
