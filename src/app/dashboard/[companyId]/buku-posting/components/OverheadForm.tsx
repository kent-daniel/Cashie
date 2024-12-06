"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "../../../utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import createNewProject from "../actions";

interface FormData {
  code: string;
  name: string;
  value: string;
  date: Date;
}

interface OverheadFormProps {
  closeForm: () => void;
  companyId: number;
}

export const OverheadForm = ({ closeForm, companyId }: OverheadFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      code: "",
      name: "",
      value: "",
      date: new Date(),
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // const response = await createNewProject({
    //   companyId: companyId,
    //   completed: false,
    //   ...data,
    // });
    // if (!response.success) {
    //   toast.error(response.message);
    // } else {
    //   toast.success(response.message);
    //   closeForm();
    // }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="code">Kode Overhead</Label>
          <Input
            id="code"
            {...register("code", { required: "Kode overhead diperlukan" })}
            placeholder="Masukkan kode overhead"
          />
          {errors.code && <p className="text-red-500">{errors.code.message}</p>}
        </div>

        <div>
          <Label htmlFor="name">Nama Overhead</Label>
          <Input
            id="name"
            {...register("name", { required: "Nama overhead diperlukan" })}
            placeholder="Masukkan nama overhead"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="value">Nilai</Label>
          <Input
            id="value"
            {...register("value", {
              required: "Nilai overhead wajib diisi",
              onChange: (e) => {
                const formatted = formatCurrency(e.target.value);
                setValue("value", formatted);
              },
            })}
            placeholder="Masukkan nilai overhead"
          />
          {errors.value && (
            <p className="text-red-500">{errors.value.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="date">Tanggal</Label>
          <Input
            id="date"
            type="date"
            {...register("date", { required: "Tanggal diperlukan" })}
          />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>

        <div className="flex">
          <Button
            type="submit"
            className="w-full bg-emerald-700 hover:bg-emerald-600 text-white"
          >
            Tambah Overhead
          </Button>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};
