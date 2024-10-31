"use client";

import React from "react";
import { NewProjectForm } from "./NewProjectForm";
import { PopoverForm } from "./popover-form";

const ProjectListHeader = () => {
  return (
    <>
      <h1 className="text-4xl font-semibold">Projects</h1>
      <PopoverForm name="Tambah project" title="Tambah Project Baru">
        {(closePopover) => <NewProjectForm closeForm={() => closePopover()} />}
      </PopoverForm>
    </>
  );
};

export default ProjectListHeader;
