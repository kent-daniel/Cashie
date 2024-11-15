import { Button } from "@/components/ui/button";
import { Eye, TrashIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { deletePayment } from "../../payment-entry/actions";
import { toast } from "react-toastify";

export const PaymentRowActionCell = ({ paymentId }: { paymentId: string }) => {
  const handleDelete = async () => {
    try {
      await deletePayment(Number(paymentId));
      toast.error("Payment deleted");
    } catch (error) {
      toast.error(error as string);
    }
  };
  return (
    <div className="flex gap-2">
      <Button>
        <Link href={`payment-entry/${paymentId}`}>
          <Eye />
        </Link>
      </Button>
      <Button
        type="reset"
        className="bg-red-600 text-white hover:bg-red-500"
        onClick={handleDelete}
      >
        <TrashIcon />
      </Button>
    </div>
  );
};
