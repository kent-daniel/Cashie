import { Project } from "@/data-access/projects";
import React from "react";
import { fetchProjectRevisionHistory } from "../actions";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@radix-ui/react-label";

const ProjectRevisionList = async ({ project }: { project: Project }) => {
  const historyList = await fetchProjectRevisionHistory(project.id);

  return (
    <Card className="w-full p-3 bg-zinc-900 text-white rounded-md shadow-md">
      <CardContent>
        {historyList.length > 0 ? (
          <ScrollArea className="h-64 overflow-y-auto rounded-md">
            {historyList.map((history, index) => (
              <div
                key={index}
                className="p-3 border-b border-zinc-700 last:border-none"
              >
                <Label className="text-sm text-zinc-500">
                  {new Date(history.date).toLocaleString()}
                </Label>
                <p className="text-sm">{history.description}</p>
                <p className="text-xs text-zinc-400">By: {history.email}</p>
              </div>
            ))}
          </ScrollArea>
        ) : (
          <span>Belum ada revisi</span>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectRevisionList;
