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
import { XIcon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface PopoverFormProps {
  name: string;
  title: string;
  children: ChildrenFunction;
}
export type ChildrenFunction = (closePopover: Function) => ReactNode;

export function PopoverForm({ name, title, children }: PopoverFormProps) {
  const [open, setOpen] = useState(false);
  const closePopover = () => {
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{name}</Button>
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
