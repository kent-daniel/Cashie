"use client";
import { ProjectDomain } from "@/data-access/projects";
import React from "react";
import { PopoverForm } from "../../../buku-posting/components/popover-form";
import { ProjectChart } from "../ProjectChart";
import ProjectRevisionForm from "../ProjectRevisionForm";
import { Separator } from "@/components/ui/separator";

export const ProjectMenu = ({ project }: { project: ProjectDomain }) => {
  return (
    <div className="flex gap-4">
      <div className="w-1/2">
        <ProjectChart project={project} />
      </div>
      <div className="w-1/2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">History revisi project</h1>
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
    </div>
  );
};
