import React from "react";
import { Button } from "@/components/ui/button";
import { markProjectAsCompleted } from "../actions";
import { toast } from "react-toastify";

export const ProjectCompleteConfirmationDialogue = ({
  closePopover,
  projectId,
}: {
  closePopover: () => void;
  projectId: number;
}) => {
  const handleCompleteProject = async () => {
    try {
      await markProjectAsCompleted(projectId);
      toast.success("Proyek berhasil ditandai selesai");
      closePopover();
    } catch (error) {
      toast.error("Gagal menutup proyek");
    }
  };
  return (
    <div className="flex flex-col gap-3 font-medium">
      <span className="my-3">
        Proyek akan ditutup dan ditandai sebagai selesai. Setelah ditutup,
        proyek tidak dapat direvisi atau ditambahkan entri baru.
      </span>
      <div className="flex gap-3">
        <Button
          variant="destructive"
          className="w-1/2"
          onClick={handleCompleteProject}
        >
          Tutup project
        </Button>
        <Button variant="outline" className="w-1/2" onClick={closePopover}>
          Batal
        </Button>
      </div>
    </div>
  );
};
