"use server";

import { db } from "@/db"; // Assuming db is your database instance
import { eq } from "drizzle-orm";
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

export const getCompanyNameById = async (
  companyId: string
): Promise<string | null> => {
  try {
    const result = await db
      .select({ name: companies.name })
      .from(companies)
      .where(eq(companies.id, Number(companyId)))
      .limit(1);

    return result[0]?.name || null; // Returns the name if found, otherwise null
  } catch (error) {
    console.error("Error fetching company name:", error);
    return null;
  }
};
