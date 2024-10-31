"use server";

import {
  Project,
  ProjectData,
  ProjectDomain,
  createProject,
  fetchProjectRecords,
} from "@/data-access/projects";
import { revalidatePath } from "next/cache";
import { formatCurrency, parseCurrency } from "./utils";
import { projects } from "@/models/schema";

const toDomainProjectData = (projectData: ProjectData): ProjectDomain => {
  return {
    ...projectData,
    estimationBudget: parseCurrency(projectData.estimationBudget).toPrecision(),
    projectValue: parseCurrency(projectData.projectValue).toPrecision(),
    date:
      typeof projectData.date === "string"
        ? projectData.date
        : projectData.date.toISOString().split("T")[0],
  };
};

const toModelProject = (project: typeof projects.$inferSelect): Project => {
  return {
    projectCode: project.projectCode,
    projectValue: formatCurrency(project.projectValue),
    estimationBudget: formatCurrency(project.estimationBudget),
    name: project.name,
    date: new Date(project.date),
  };
};

const createNewProject = async (data: ProjectData) => {
  try {
    const transformedData = toDomainProjectData(data);
    const response = await createProject(transformedData);
    if (response.success) {
      revalidatePath("/");
    }
    return response;
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      success: false,
      message: "Failed to create project. Please try again.",
    };
  }
};

export default createNewProject;

export const fetchProjects = async (companyId: number) => {
  try {
    const response = await fetchProjectRecords(companyId);
    return response.projects?.map(toModelProject);
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch project. Please try again.",
    };
  }
};
