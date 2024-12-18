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
  projectCode: string;
  name: string;
  estimationBudget: string;
  projectValue: string;
  date: Date;
}

interface NewProjectFormProps {
  closeForm: () => void;
  companyId: number;
}

export const NewProjectForm = ({
  closeForm,
  companyId,
}: NewProjectFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      projectCode: "",
      name: "",
      estimationBudget: "",
      projectValue: "",
      date: new Date(),
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await createNewProject({
      companyId: companyId,
      completed: false,
      ...data,
    });
    if (!response.success) {
      toast.error(response.message); // Display error toast
    } else {
      toast.success(response.message); // Display success toast
      closeForm();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="projectCode">Kode Proyek</Label>
          <Input
            id="projectCode"
            {...register("projectCode", { required: "Kode proyek diperlukan" })}
            placeholder="Masukkan kode proyek"
          />
          {errors.projectCode && (
            <p className="text-red-500">{errors.projectCode.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="name">Nama Proyek</Label>
          <Input
            id="name"
            {...register("name", { required: "Nama proyek diperlukan" })}
            placeholder="Masukkan nama proyek"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="estimationBudget">RAB</Label>
          <Input
            id="estimationBudget"
            {...register("estimationBudget", {
              required: "Estimasi anggaran wajib diisi",
              onChange: (e) => {
                const formatted = formatCurrency(e.target.value);
                setValue("estimationBudget", formatted); // Update the input with formatted value
              },
            })}
            placeholder="Masukkan RAB"
          />
          {errors.estimationBudget && (
            <p className="text-red-500">{errors.estimationBudget.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="projectValue">Nilai Kontrak</Label>
          <Input
            id="projectValue"
            {...register("projectValue", {
              required: "Nilai proyek wajib diisi",
              onChange: (e) => {
                const formatted = formatCurrency(e.target.value);
                setValue("projectValue", formatted);
              },
            })}
            placeholder="Masukkan nilai kontrak"
          />
          {errors.projectValue && (
            <p className="text-red-500">{errors.projectValue.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="date">Tanggal Mulai</Label>
          <Input
            id="date"
            type="date"
            {...register("date", { required: "Tanggal mulai diperlukan" })}
          />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>

        <div className="flex">
          <Button
            type="submit"
            className="w-full bg-emerald-700 hover:bg-emerald-600 text-white"
          >
            Buat Proyek
          </Button>
        </div>
      </form>

      {/* ToastContainer needs to be rendered once in the component tree */}
      <ToastContainer />
    </>
  );
};
