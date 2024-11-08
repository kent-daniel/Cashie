"use client";
import React, { useState } from "react";
import { PaymentPresentationDTO } from "../../actions";
import { formatCurrency } from "@/app/dashboard/utils";
import { Button } from "@/components/ui/button";
import { EditIcon, CheckIcon, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export const PaymentDetailCard = ({
  paymentDetails,
}: {
  paymentDetails: PaymentPresentationDTO;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: paymentDetails,
  });

  const onSubmit = (data: PaymentPresentationDTO) => {
    // Implement save logic here, such as an API call
    console.log("Saved Data:", data);
    setIsEditing(false);
  };

  const toggleEditMode = () => setIsEditing(!isEditing);
  const handleCancel = () => {
    reset(paymentDetails); // Reset form to original values
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
          Detail Pencatatan
        </h1>
        {isEditing ? (
          <div className="space-x-2">
            <Button
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
              onClick={handleSubmit(onSubmit)}
            >
              Save <CheckIcon />
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-500 text-white"
              onClick={handleCancel}
            >
              Cancel <XIcon />
            </Button>
          </div>
        ) : (
          <Button
            className="bg-emerald-600 hover:bg-emerald-500 text-white"
            onClick={toggleEditMode}
          >
            Revisi <EditIcon />
          </Button>
        )}
      </div>

      <form
        className="space-y-4 text-zinc-800 dark:text-zinc-300 font-medium"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p>
          <strong>Kode Proyek:</strong>{" "}
          {isEditing ? (
            <input
              {...register("projectCode", {
                required: "Kode Proyek is required",
              })}
              className="bg-zinc-700 text-white rounded px-3 py-2 w-full"
            />
          ) : (
            paymentDetails.projectCode
          )}
          {errors.projectCode && (
            <span className="text-red-500">{errors.projectCode.message}</span>
          )}
        </p>

        <p>
          <strong>Jumlah:</strong>{" "}
          {isEditing ? (
            <input
              {...register("amount", {
                required: "Jumlah is required",
                valueAsNumber: true,
              })}
              type="number"
              className="bg-zinc-700 text-white rounded px-3 py-2 w-full"
            />
          ) : (
            formatCurrency(paymentDetails.amount.toLocaleString())
          )}
          {errors.amount && (
            <span className="text-red-500">{errors.amount.message}</span>
          )}
        </p>

        <p>
          <strong>Kategori:</strong>{" "}
          {isEditing ? (
            <input
              {...register("category", { required: "Kategori is required" })}
              className="bg-zinc-700 text-white rounded px-3 py-2 w-full"
            />
          ) : (
            paymentDetails.category
          )}
          {errors.category && (
            <span className="text-red-500">{errors.category.message}</span>
          )}
        </p>

        <p>
          <strong>Deskripsi:</strong>{" "}
          {isEditing ? (
            <input
              {...register("description")}
              className="bg-zinc-700 text-white rounded px-3 py-2 w-full"
            />
          ) : (
            paymentDetails.description
          )}
        </p>

        <p>
          <strong>Dicatat oleh:</strong>{" "}
          {isEditing ? (
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="bg-zinc-700 text-white rounded px-3 py-2 w-full"
            />
          ) : (
            paymentDetails.email
          )}
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </p>

        <p>
          <strong>Tanggal:</strong>{" "}
          {isEditing ? (
            <input
              {...register("date", { required: "Tanggal is required" })}
              type="date"
              className="bg-zinc-700 text-white rounded px-3 py-2 w-full"
            />
          ) : (
            paymentDetails.date.toLocaleDateString("id-ID")
          )}
          {errors.date && (
            <span className="text-red-500">{errors.date.message}</span>
          )}
        </p>
      </form>
    </div>
  );
};
