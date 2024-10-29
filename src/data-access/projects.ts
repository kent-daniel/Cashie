"use server";
import { db } from "@/db/index";
import { payments } from "@/models/schema";
import { eq, desc, sql } from "drizzle-orm";

interface ProjectData {
  projectCode: string;
  name: string;
  estimationBudget: string;
  projectValue: string;
  date: Date;
}

const toDomainPaymentData = (projectData: ProjectData) => {
  return {
    ...projectData,
    date:
      typeof projectData.date === "string"
        ? projectData.date // Return the date as-is if it's already a string
        : projectData.date.toISOString().split("T")[0], // Convert Date to string in 'YYYY-MM-DD' format
  };
};

export const createProject = (projectData: ProjectData) => {};
