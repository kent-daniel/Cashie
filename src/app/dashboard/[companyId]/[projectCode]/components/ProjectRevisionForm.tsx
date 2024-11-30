"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/app/dashboard/utils";
import { reviseProjectDetails } from "../actions";
import { Project } from "@/data-access/projects";
import { toast } from "react-toastify";
import { PopoverForm } from "../../buku-posting/components/popover-form";
import { ProjectCompleteConfirmationDialogue } from "./ProjectCompleteConfirmationDialogue";

interface ProjectRevisionFormProps {
  project: Project;
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
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      projectName: project.name,
      contractValue: formatCurrency(Number(project.projectValue).toString()),
      estimationBudget: formatCurrency(
        Number(project.estimationBudget).toString()
      ),
      startDate: project.date.toISOString().split("T")[0],
      comment: "",
    },
  });
  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data);
    // Handle form submission logic
    const response = await reviseProjectDetails(
      data.projectName,
      data.contractValue,
      project.projectCode,
      project.id,
      data.comment,
      data.estimationBudget,
      data.startDate
    );
    if (response.success) {
      toast.success(response.message);
      closeForm();
    } else {
      toast.error(response.message);
    }
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

      <Button type="submit" className="w-full">
        Submit
      </Button>
      <PopoverForm
        name={"Tutup project"}
        title={"Konfirmasi untuk menutup proyek"}
        className="w-full bg-destructive border-destructive hover:bg-destructive/80"
      >
        {(closePopover) => (
          <ProjectCompleteConfirmationDialogue
            closePopover={closePopover}
            projectId={project.id}
          />
        )}
      </PopoverForm>
    </form>
  );
};

export default ProjectRevisionForm;
