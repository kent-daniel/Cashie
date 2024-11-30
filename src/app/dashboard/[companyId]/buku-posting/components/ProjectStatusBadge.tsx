import { CircleCheck } from "lucide-react";
import React from "react";

const ProjectStatusBadge = ({ completed }: { completed: boolean }) => {
  return completed ? (
    <div className="rounded-full max-w-sm mx-auto mb-3 flex justify-center items-center p-2 text-sm bg-emerald-700/80 border-emerald-500 border gap-2">
      Project selesai <CircleCheck size={16} />
    </div>
  ) : (
    <div className="rounded-full max-w-sm mx-auto mb-3 flex justify-center items-center p-2 text-sm bg-zinc-600 border gap-2">
      Project ongoing
    </div>
  );
};

export default ProjectStatusBadge;
