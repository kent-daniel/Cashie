import { Project } from "@/data-access/projects";
import React from "react";
import ProjectStatusBadge from "../../buku-posting/components/ProjectStatusBadge";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="text-center">
      <ProjectStatusBadge completed={project.completed} />
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-3">
        {project.name}
      </h2>
      <p className="text-gray-700 dark:text-gray-300">{project.projectCode}</p>
      <span className="text-gray-600 dark:text-gray-400">
        {project.date.toISOString().split("T")[0]}
      </span>
    </div>
  );
};

export default ProjectCard;
