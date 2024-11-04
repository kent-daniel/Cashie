import { Button } from "@/components/ui/button";
import { Column, Row } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import { PaymentRow } from "../actions";
import Link from "next/link";

export const getPaymentRecordsColumns = (nilaiProyek: string, RAB: string) => {
  return [
    {
      accessorKey: "date",
      header: ({ column }: { column: Column<PaymentRow> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<PaymentRow> }) => (
        <div className="lowercase p-2">
          {(row.getValue("date") as Date).toLocaleDateString()}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: () => <p>Deskripsi</p>,
      cell: ({ row }: { row: Row<PaymentRow> }) => (
        <div className="lowercase">{row.getValue("description")}</div>
      ),
    },

    // Group for "nilai proyek"
    {
      header: `Nilai proyek ${nilaiProyek}`, // Updated header to include parameter
      columns: [
        {
          accessorKey: "debitAmount",
          header: ({ column }: { column: Column<PaymentRow> }) => (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Pembayaran
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          ),
          cell: ({ row }: { row: Row<PaymentRow> }) => {
            const amount = parseFloat(row.getValue("debitAmount"));
            const formatted = new Intl.NumberFormat("id", {
              style: "currency",
              currency: "IDR",
            }).format(amount);

            return amount === 0 ? (
              ""
            ) : (
              <div className="text-start">{formatted}</div>
            );
          },
        },
        {
          accessorKey: "remainingValue",
          header: () => <Button variant="ghost">Sisa nilai proyek</Button>,
          cell: ({ row }: { row: Row<PaymentRow> }) => {
            const amount = parseFloat(row.getValue("remainingValue"));
            const formatted = new Intl.NumberFormat("id", {
              style: "currency",
              currency: "IDR",
            }).format(amount);

            return <div className="text-start">{formatted}</div>;
          },
        },
      ],
    },

    // Group for "RAB"
    {
      header: `RAB ${RAB}`, // Updated header to include parameter
      columns: [
        {
          accessorKey: "creditAmount",
          header: ({ column }: { column: Column<PaymentRow> }) => (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Biaya
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          ),
          cell: ({ row }: { row: Row<PaymentRow> }) => {
            const amount = parseFloat(row.getValue("creditAmount"));
            const formatted = new Intl.NumberFormat("id", {
              style: "currency",
              currency: "IDR",
            }).format(amount);

            return amount === 0 ? (
              ""
            ) : (
              <div className="text-start">{formatted}</div>
            );
          },
        },
        {
          accessorKey: "remainingBudget",
          header: () => <Button variant="ghost">Sisa RAB</Button>,
          cell: ({ row }: { row: Row<PaymentRow> }) => {
            const amount = parseFloat(row.getValue("remainingBudget"));
            const formatted = new Intl.NumberFormat("id", {
              style: "currency",
              currency: "IDR",
            }).format(amount);

            return (
              <div
                className={`text-start ${
                  amount < 0 ? "text-red-500" : "text-emerald-500"
                }`}
              >
                {formatted}
              </div>
            );
          },
        },
      ],
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }: { row: Row<PaymentRow> }) => {
        const payment = row.original;

        return (
          <Button>
            <Link href={`payment-entry/${payment.id.toLocaleString()}`}>
              <Eye />
            </Link>
          </Button>
        );
      },
    },
  ];
};
