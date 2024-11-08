"use client";
import React from "react";
import { PaymentPresentationDTO } from "../../actions";
import { formatCurrency } from "@/app/dashboard/utils";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";

export const PaymentDetailCard = ({
  paymentDetails,
}: {
  paymentDetails: PaymentPresentationDTO;
}) => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
          Detail Pencatatan
        </h1>
        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white">
          Revisi <EditIcon />
        </Button>
      </div>

      <div className="space-y-4 text-zinc-800 dark:text-zinc-300 font-medium">
        <p>
          <strong className="">Kode Proyek:</strong>{" "}
          {paymentDetails.projectCode}
        </p>
        <p>
          <strong className="">Jumlah:</strong>{" "}
          {formatCurrency(paymentDetails.amount.toLocaleString())}
        </p>
        <p>
          <strong className="">Kategori:</strong> {paymentDetails.category}
        </p>
        <p>
          <strong className="">Deskripsi:</strong> {paymentDetails.description}
        </p>
        <p>
          <strong className="">Dicatat oleh:</strong> {paymentDetails.email}
        </p>
        <p>
          <strong className="">Tanggal:</strong>{" "}
          {paymentDetails.date.toLocaleDateString("id-ID")}
        </p>
      </div>
    </div>
  );
};
