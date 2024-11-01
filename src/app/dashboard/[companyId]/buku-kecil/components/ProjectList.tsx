import React from "react";
import { fetchProjects } from "../actions";
import { Project } from "@/data-access/projects";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
const ProjectCell = ({ project }: { project: Project }) => (
  <Card className="w-full mb-4 shadow-lg border border-gray-200">
    <CardHeader>
      <CardTitle className="text-xl font-semibold">{project.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Kode Proyek: {project.projectCode}</p>
      <p>Nilai Proyek: {project.projectValue}</p>
      <p>Estimasi Anggaran: {project.estimationBudget}</p>
      <p>Tanggal Mulai: {project.date.toLocaleDateString()}</p>
    </CardContent>
  </Card>
);
export const ProjectList = async () => {
  const projects = await fetchProjects(1);
  return (
    <div className="p-4">
      {projects?.map((project, index) => (
        <ProjectCell key={index} project={project} />
      ))}
    </div>
  );
};
