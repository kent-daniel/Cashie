import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export const BackToDashboardButton = () => {
  return (
    <Link href="/dashboard" className="">
      <Button className="" variant="outline">
        <ArrowLeft />
        Balik ke dashboard
      </Button>
    </Link>
  );
};
