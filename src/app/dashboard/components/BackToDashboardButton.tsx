import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export const BackToDashboardButton = () => {
  return (
    <Link href="/dashboard" className="">
      <Button
        className=" text-white hover:bg-emerald-900/50 border-emerald-900 m-3"
        variant="outline"
      >
        <ArrowLeft />
        Kembali ke dashboard
      </Button>
    </Link>
  );
};
