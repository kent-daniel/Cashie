"use client";
import React from "react";
import { PopoverForm } from "./components/popover-form";
import { Separator } from "@/components/ui/separator";
import { NewProjectForm } from "./components/NewProjectForm";

const page = () => {
  return (
    <div className="mx-auto w-1/2">
      <div className="flex justify-between p-3 mt-7">
        <h1 className="text-4xl font-semibold">Projects</h1>
        <PopoverForm name="Tambah project" title="Tambah Project Baru">
          {(closePopover) => (
            <NewProjectForm closeForm={() => closePopover()} />
          )}
        </PopoverForm>
      </div>

      <Separator />
    </div>
  );
};

export default page;
