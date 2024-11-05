import { ProjectDomain } from "@/data-access/projects";
import React from "react";

const ProjectCard = ({ project }: { project: ProjectDomain }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-3">
        {project.name}
      </h2>
      <p className="text-gray-700 dark:text-gray-300">{project.projectCode}</p>
      <span className="text-gray-600 dark:text-gray-400">{project.date}</span>
    </div>
  );
};

export default ProjectCard;
