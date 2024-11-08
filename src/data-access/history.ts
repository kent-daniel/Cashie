import { db } from "@/db";
import { history } from "../models/schema";
import { eq, and } from "drizzle-orm"; // Adjust the import based on your project structure

type ReferenceType = "payment" | "project";

export const addHistory = async (
  referenceId: number,
  referenceType: ReferenceType,
  description: string,
  email: string
) => {
  await db.insert(history).values({
    referenceId,
    referenceType,
    description,
    date: new Date().toString(),
    email,
  });
};

export const fetchHistory = async (
  referenceId: number,
  type: ReferenceType
) => {
  return await db
    .select()
    .from(history)
    .where(
      and(eq(history.referenceId, referenceId), eq(history.referenceType, type))
    );
};
