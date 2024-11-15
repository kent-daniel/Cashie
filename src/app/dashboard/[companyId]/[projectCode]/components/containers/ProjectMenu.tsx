"use client";
import { Project } from "@/data-access/projects";
import React from "react";
import { PopoverForm } from "../../../buku-posting/components/popover-form";
import ProjectRevisionForm from "../ProjectRevisionForm";
import { Separator } from "@/components/ui/separator";

export const ProjectMenu = ({ project }: { project: Project }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">History Revisi Project</h1>
        <PopoverForm
          name={"Revisi project"}
          title={"Revisi Nilai & RAB project"}
        >
          {(closePopover) => (
            <ProjectRevisionForm
              closeForm={() => closePopover()}
              project={project}
            />
          )}
        </PopoverForm>
      </div>
      <Separator className="my-3" />
    </div>
  );
};
