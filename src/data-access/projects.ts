"use server";
import { formatCurrency, parseCurrency } from "@/app/dashboard/utils";
import { db } from "@/db/index";
import { projects } from "@/models/schema";
import { eq, desc, sql } from "drizzle-orm";

export interface ProjectData {
  companyId: number;
  projectCode: string;
  name: string;
  estimationBudget: string;
  projectValue: string;
  date: Date;
}

export type Project = {
  projectCode: string;
  name: string;
  estimationBudget: string;
  projectValue: string;
  date: Date;
};

// `ProjectDomain` now correctly extends `ProjectData`
export type ProjectDomain = Omit<ProjectData, "date"> & {
  date: string;
};

export const createProject = async (projectData: ProjectDomain) => {
  try {
    await db.insert(projects).values(projectData);
    return { success: true, message: "Project created successfully" };
  } catch (error) {
    return { success: false, message: `Failed to create project: ${error}` };
  }
};

export const fetchProjectRecords = async (companyId: number) => {
  try {
    const projectRecords = await db
      .select()
      .from(projects)
      .where(eq(projects.companyId, companyId))
      .orderBy(desc(projects.date));

    return { success: true, projects: projectRecords };
  } catch (error) {
    return {
      success: false,
      message: `Failed to fetch projects: ${error}`,
    };
  }
};
