import React from "react";
import { fetchProjects } from "../actions";
import { Project } from "@/data-access/projects";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ProjectCell = ({ project }: { project: Project }) => (
  <Card className="w-full mb-4 border border-zinc-700 bg-zinc-900 text-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-200">
    <CardHeader className="p-4 rounded-t-lg flex justify-between items-center border-b border-zinc-700">
      <CardTitle className="text-lg font-semibold text-gray-50">
        {project.name}
      </CardTitle>
      <span className="text-md font-medium text-gray-400">
        #{project.projectCode}
      </span>
    </CardHeader>
    <CardContent className="p-4 space-y-2 text-sm text-gray-300">
      <div className="flex justify-between">
        <span className="font-medium text-gray-200">Nilai:</span>
        <span className="text-gray-400">{project.projectValue}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium text-gray-200">Estimasi:</span>
        <span className="text-gray-400">{project.estimationBudget}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium text-gray-200">Tanggal:</span>
        <span className="text-gray-400">
          {project.date.toLocaleDateString()}
        </span>
      </div>
    </CardContent>
  </Card>
);

export const ProjectList = async () => {
  const projects = await fetchProjects(1);
  return (
    <div className="p-6 space-y-4 min-h-screen">
      {projects?.map((project, index) => (
        <ProjectCell key={index} project={project} />
      ))}
    </div>
  );
};
