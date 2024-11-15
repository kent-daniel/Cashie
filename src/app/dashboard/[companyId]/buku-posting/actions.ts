"use server";

import {
  Project,
  ProjectData,
  ProjectDomain,
  createProject,
  fetchProjectRecords,
} from "@/data-access/projects";
import { revalidatePath } from "next/cache";
import { formatCurrency, parseCurrency } from "../../utils";
import { projects } from "@/models/schema";
import { getTotalProjectCreditDebit } from "@/data-access/payment";

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
    id: project.id,
    projectCode: project.projectCode,
    projectValue: formatCurrency(Number(project.projectValue).toString()),
    estimationBudget: formatCurrency(
      Number(project.estimationBudget).toString()
    ),
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

export const fetchProjects = async (companyId: number): Promise<Project[]> => {
  try {
    const response = await fetchProjectRecords(companyId);
    return response.projects?.map(toModelProject) || [];
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
};

export const getProjectStatistics = async (
  projectCode: string
): Promise<{
  totalCredit: string;
  totalDebit: string;
}> => {
  try {
    const response = await getTotalProjectCreditDebit(projectCode);
    return {
      totalCredit: formatCurrency(response.totalCredit.toString()),
      totalDebit: formatCurrency(response.totalDebit.toString()),
    };
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return {
      totalCredit: "Tidak ada",
      totalDebit: "Tidak ada",
    };
  }
};
