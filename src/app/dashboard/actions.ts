"use server";

import { db } from "@/db"; // Assuming db is your database instance
import { companies } from "@/models/schema"; // Adjust if schema path differs

export interface Company {
  id: number;
  name: string;
}

export const fetchCompanies = async (): Promise<Company[]> => {
  try {
    const allCompanies = await db.select().from(companies);
    return allCompanies;
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
};
