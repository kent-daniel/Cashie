"use server";
import { db } from "@/db/index";
import { projects } from "@/models/schema";
import { eq, desc, and, or, like } from "drizzle-orm";
import { sql } from "drizzle-orm";

export interface ProjectData {
  companyId: number;
  projectCode: string;
  name: string;
  estimationBudget: string;
  projectValue: string;
  completed: boolean;
  date: Date;
}

export type Project = {
  id: number;
  projectCode: string;
  name: string;
  estimationBudget: string;
  projectValue: string;
  completed: boolean;
  date: Date;
};

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

export const queryProjects = async (
  companyId: number,
  textQuery: string,
  filter: string
) => {
  try {
    const projectRecords = await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.companyId, companyId),
          filter === "active"
            ? eq(projects.completed, false)
            : filter === "completed"
            ? eq(projects.completed, true)
            : undefined,
          or(
            sql`lower(${
              projects.name
            }) ILIKE '%' || ${textQuery.toLowerCase()} || '%'`,
            sql`lower(${
              projects.projectCode
            }) ILIKE '%' || ${textQuery.toLowerCase()} || '%'`
          )
        )
      )
      .orderBy(desc(projects.date));

    return { success: true, projects: projectRecords };
  } catch (error) {
    return {
      success: false,
      message: `Failed to fetch projects: ${error}`,
    };
  }
};

export const fetchProjectByCode = async (projectCode: string) => {
  try {
    const projectRecord = await db
      .select()
      .from(projects)
      .where(eq(projects.projectCode, projectCode));

    if (projectRecord.length === 0) {
      return {
        success: false,
        message: `Project with code ${projectCode} not found`,
      };
    }

    return { success: true, project: projectRecord[0] };
  } catch (error) {
    return {
      success: false,
      message: `Failed to fetch project by code: ${error}`,
    };
  }
};

export const fetchUniqueProjectCodes = async () => {
  try {
    const projectCodes = await db
      .selectDistinct({ projectCode: projects.projectCode })
      .from(projects)
      .where(eq(projects.completed, false))
      .orderBy(desc(projects.projectCode));

    return projectCodes.map((p) => p.projectCode);
  } catch (error) {
    console.error({
      success: false,
      message: `Failed to fetch unique project codes: ${error}`,
    });
    return [];
  }
};

export const updateProjectByCode = async (updatedData: Project) => {
  try {
    await db
      .update(projects)
      .set({
        projectValue: updatedData.projectValue,
        estimationBudget: updatedData.estimationBudget,
        date: updatedData.date.toISOString().split("T")[0],
        name: updatedData.name,
      })
      .where(
        and(
          eq(projects.projectCode, updatedData.projectCode),
          eq(projects.completed, false)
        )
      );

    return { success: true, message: "Project updated successfully" };
  } catch (error) {
    return { success: false, message: `Failed to update project: ${error}` };
  }
};

export const markProjectAsComplete = async (projectId: number) => {
  try {
    await db
      .update(projects)
      .set({
        completed: true,
      })
      .where(and(eq(projects.id, projectId), eq(projects.completed, false)));

    return { success: true, message: "Project marked as complete" };
  } catch (error) {
    return {
      success: false,
      message: `Failed to mark project as complete: ${error}`,
    };
  }
};
