"use server";
import { parseCurrency } from "@/app/dashboard/utils";
import { db } from "@/db/index";
import { projects } from "@/models/schema";
import { eq, desc, sql } from "drizzle-orm";

interface ProjectData {
  companyId: number;
  projectCode: string;
  name: string;
  estimationBudget: string;
  projectValue: string;
  date: Date;
}

const toDomainProjectData = (projectData: ProjectData) => {
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

export const createProject = async (projectData: ProjectData) => {
  const transformedData = toDomainProjectData(projectData);
  try {
    await db.insert(projects).values(transformedData);

    return { success: true, message: "Project created successfully" };
  } catch (error) {
    return { success: false, message: `Failed to create project` };
  }
};
