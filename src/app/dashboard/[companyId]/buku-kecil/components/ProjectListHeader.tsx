"use client";

import React from "react";
import { NewProjectForm } from "./NewProjectForm";
import { PopoverForm } from "./popover-form";
import { Separator } from "@/components/ui/separator";

const ProjectListHeader = () => {
  return (
    <>
      <div className="flex justify-between p-3 mt-7">
        <h1 className="text-4xl font-semibold">Projects</h1>
        <PopoverForm name="Tambah project" title="Tambah Project Baru">
          {(closePopover) => (
            <NewProjectForm closeForm={() => closePopover()} />
          )}
        </PopoverForm>
      </div>
      <Separator className="bg-emerald-700" />
    </>
  );
};

export default ProjectListHeader;