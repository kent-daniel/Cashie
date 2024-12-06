"use client";

import React from "react";
import { PopoverForm } from "./popover-form";
import { Separator } from "@/components/ui/separator";
import { OverheadForm } from "./OverheadForm";

const OverheadCostHeader = ({ companyId }: { companyId: string }) => {
  return (
    <>
      <div className="flex justify-between p-3 mt-7">
        <h1 className="text-4xl font-semibold">Biaya Overhead</h1>
        <PopoverForm name="Tambah overhead" title="Tambah Overhead">
          {(closePopover) => (
            <OverheadForm
              closeForm={() => closePopover()}
              companyId={Number(companyId)}
            />
          )}
        </PopoverForm>
      </div>
      <Separator className="" />
    </>
  );
};

export default OverheadCostHeader;
