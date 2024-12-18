"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { ReactNode, useState } from "react";

interface PopoverFormProps {
  name: string;
  title: string;
  className?: string;
  disabled?: boolean;
  children: ChildrenFunction;
}
export type ChildrenFunction = (closePopover: () => void) => ReactNode;

export function PopoverForm({
  name,
  title,
  children,
  className,
  disabled,
}: PopoverFormProps) {
  const [open, setOpen] = useState(false);
  const closePopover = () => {
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className={cn(
            "bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-700 border-t-emerald-600  border",
            className
          )}
          disabled={disabled || false}
        >
          {name}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogContent>
          <AlertDialogHeader className="flex justify-between flex-row items-center">
            <AlertDialogTitle className="max-w-fit">{title}</AlertDialogTitle>
            <AlertDialogCancel className="max-w-fit">
              <XIcon />
            </AlertDialogCancel>
          </AlertDialogHeader>
          {children(closePopover)}
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
}
