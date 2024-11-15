"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ProjectDomain } from "@/data-access/projects";
import { formatCurrency } from "@/app/dashboard/utils";

interface ProjectRevisionFormProps {
  project: ProjectDomain;
  closeForm: () => void;
}

interface FormData {
  projectName: string;
  contractValue: string;
  estimationBudget: string;
  startDate: string;
  comment: string;
}

const ProjectRevisionForm: React.FC<ProjectRevisionFormProps> = ({
  project,
  closeForm,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      projectName: project.name,
      contractValue: formatCurrency(project.projectValue),
      estimationBudget: formatCurrency(project.estimationBudget),
      startDate: project.date,
      comment: "",
    },
  });
  console.log(project);
  const onSubmit = (data: FormData) => {
    const formattedData = {
      ...data,
      contractValue: parseFloat(data.contractValue.replace(/[^0-9.-]+/g, "")),
      estimationBudget: parseFloat(
        data.estimationBudget.replace(/[^0-9.-]+/g, "")
      ),
    };
    console.log("Form submitted:", formattedData);
    // Handle form submission logic
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
      <div>
        <Label htmlFor="projectName">Nama Project</Label>
        <Input
          id="projectName"
          placeholder="Nama Project"
          {...register("projectName", { required: "Nama Project is required" })}
        />
        {errors.projectName && (
          <p className="text-red-500">{errors.projectName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="contractValue">Nilai Kontrak</Label>
        <Input
          id="contractValue"
          type="text"
          placeholder="Nilai Kontrak"
          {...register("contractValue", {
            required: "Nilai Kontrak is required",
          })}
          onChange={(e) =>
            setValue("contractValue", formatCurrency(e.target.value))
          }
        />
        {errors.contractValue && (
          <p className="text-red-500">{errors.contractValue.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="estimationBudget">RAB</Label>
        <Input
          id="estimationBudget"
          type="text"
          placeholder="RAB"
          {...register("estimationBudget", { required: "RAB is required" })}
          onChange={(e) =>
            setValue("estimationBudget", formatCurrency(e.target.value))
          }
        />
        {errors.estimationBudget && (
          <p className="text-red-500">{errors.estimationBudget.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="startDate">Tanggal Mulai</Label>
        <Input
          id="date"
          type="date"
          {...register("startDate", { required: "Tanggal mulai diperlukan" })}
        />
        {errors.startDate && (
          <p className="text-red-500">{errors.startDate.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="comment">Komentar</Label>
        <Textarea
          id="comment"
          placeholder="Komentar"
          {...register("comment")}
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ProjectRevisionForm;
