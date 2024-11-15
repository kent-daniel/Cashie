"use server";

import { getPaymentsByProjectCode, Payment } from "@/data-access/payment";
import {
  fetchProjectByCode,
  Project,
  ProjectDomain,
  updateProjectByCode,
} from "@/data-access/projects";
import { mkConfig } from "export-to-csv";
import { parseCurrency } from "../../utils";
import { addHistory, fetchHistory } from "@/data-access/history";
import { getEmailFromKinde } from "../payment-entry/actions";
import { revalidatePath } from "next/cache";

export type PaymentRow = Payment & {
  debitAmount: number;
  creditAmount: number;
  remainingValue: number;
  remainingBudget: number;
};

export const fetchProjectPaymentRows = async (
  projectCode: string,
  startDate?: string,
  endDate?: string
): Promise<PaymentRow[]> => {
  try {
    // Fetch payments and project data - make sure to await both
    const projectData = await fetchProjectByCode(projectCode);
    const projectRecords: Payment[] = await getPaymentsByProjectCode(
      projectCode,
      startDate,
      endDate
    );

    if (!projectData || !projectData.project) {
      console.log(`Project with code ${projectCode} not found.`);
      return [];
    }

    const { projectValue, estimationBudget } = projectData.project;

    // Make sure projectRecords is an array before mapping
    if (!Array.isArray(projectRecords)) {
      console.error("projectRecords is not an array:", projectRecords);
      return [];
    }

    // Convert project records to PaymentRow format using a for loop
    const paymentRows: PaymentRow[] = [];
    let runningDebitTotal = 0;
    let runningCreditTotal = 0;

    for (let i = projectRecords.length - 1; i >= 0; i--) {
      const payment = projectRecords[i];
      const debitAmount = payment.category === "debit" ? payment.amount : 0;
      const creditAmount = payment.category === "credit" ? payment.amount : 0;

      runningDebitTotal += debitAmount;
      runningCreditTotal += creditAmount;

      paymentRows.unshift({
        ...payment,
        debitAmount,
        creditAmount,
        remainingValue: Number(projectValue) - runningDebitTotal,
        remainingBudget: Number(estimationBudget) - runningCreditTotal,
        date: new Date(payment.date),
      });
    }

    return paymentRows;
  } catch (error) {
    console.error("Error in fetchProjectPaymentRows:", error);
    throw error;
  }
};

export const toModelPaymentRow = (payment: Payment): PaymentRow => {
  const debitAmount = payment.category === "debit" ? payment.amount : 0;
  const creditAmount = payment.category === "credit" ? payment.amount : 0;

  return {
    id: payment.id,
    projectCode: payment.projectCode,
    amount: payment.amount,
    description: payment.description ?? "",
    category: payment.category as "debit" | "credit" | "saldo",
    date: new Date(payment.date),
    email: payment.email,
    isEdited: payment.isEdited,
    isDeleted: payment.isDeleted,
    debitAmount,
    creditAmount,
    remainingValue: 0,
    remainingBudget: 0,
  };
};

export const getProjectByCode = async (
  projectCode: string
): Promise<{ success: boolean; project?: Project; message?: string }> => {
  try {
    // Call fetchProjectByCode to get the raw project data
    const result = await fetchProjectByCode(projectCode);

    if (!result.success || !result.project) {
      return { success: false, message: result.message };
    }

    // Map to ProjectDomain, converting date to string
    const projectDomain: Project = {
      ...result.project,
      date: new Date(result.project.date), // or format as needed
    };

    return { success: true, project: projectDomain };
  } catch (error) {
    return {
      success: false,
      message: `Failed to process project data: ${error}`,
    };
  }
};
export const getCsvDataFormat = async (
  projectCode: string,
  startDate?: string,
  endDate?: string
): Promise<string> => {
  const projectRecords: Payment[] = await getPaymentsByProjectCode(
    projectCode,
    startDate,
    endDate
  );

  // map to CSV columns
  const csvData = projectRecords.map((record) => ({
    Tanggal: new Date(record.date).toISOString().split("T")[0],
    Kode: record.projectCode,
    Debit: record.category === "debit" ? record.amount.toString() : "0",
    Kredit: record.category === "credit" ? record.amount.toString() : "0",
    Deskripsi: record.description ?? "",
  }));
  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `${projectCode}|${startDate ? startDate : ""}${
      endDate ? "-" + endDate : ""
    }|Summary`,
  });

  return JSON.stringify({ csvData, csvConfig });
};

const detectChanges = (
  original: ProjectDomain,
  updated: Project,
  comment: string,
  email: string
) => {
  const changes = [];

  if (original.name !== updated.name)
    changes.push(`Nama: ${original.name} -> ${updated.name}`);
  if (Number(original.projectValue).toString() !== updated.projectValue)
    changes.push(
      `Nilai kontrak: ${Number(original.projectValue).toString()} -> ${
        updated.projectValue
      }`
    );
  if (Number(original.estimationBudget).toString() !== updated.estimationBudget)
    changes.push(
      `RAB: ${Number(original.estimationBudget).toString()} -> ${
        updated.estimationBudget
      }`
    );
  if (original.date !== updated.date.toISOString().split("T")[0])
    changes.push(`Tanggal: ${original.date} -> ${updated.date}`);

  if (changes.length > 0) changes.push(`Komentar: ${comment}`);
  return changes;
};

// Main function
export const reviseProjectDetails = async (
  name: string,
  projectValue: string,
  projectCode: string,
  id: number,
  comment: string,
  RAB: string,
  date: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // Retrieve the user's email
    const email = await getEmailFromKinde();
    if (!email) {
      return { success: false, message: "Failed to retrieve user email" };
    }

    // Fetch original project values
    const originalValuesResult = await fetchProjectByCode(projectCode);
    if (!originalValuesResult.success || !originalValuesResult.project) {
      return {
        success: false,
        message: `Error fetching project: ${originalValuesResult.message}`,
      };
    }
    const originalValues = originalValuesResult.project;

    // Prepare updated data
    const updatedData = {
      id,
      name,
      projectValue: Number(parseCurrency(projectValue)).toString(),
      estimationBudget: Number(parseCurrency(RAB)).toString(),
      projectCode,
      date: new Date(date),
    };

    // Detect changes
    const changes = detectChanges(originalValues, updatedData, comment, email);
    if (changes.length === 0) {
      return { success: true, message: "No changes detected" };
    }

    // Update project data
    const result = await updateProjectByCode(updatedData);
    if (!result.success) {
      return {
        success: false,
        message: `Failed to update project: ${result.message}`,
      };
    }

    // Add history with changes
    await addHistory(id, "project", changes.join("\n"), email);
    revalidatePath("/");
    return { success: true, message: "Project revised successfully" };
  } catch (error) {
    return { success: false, message: `Error revising project: ${error}` };
  }
};
export interface ProjectRevisionHistory {
  date: string;
  description: string;
  email: string;
}

export const fetchProjectRevisionHistory = async (
  projectId: number
): Promise<ProjectRevisionHistory[]> => {
  const result = await fetchHistory(projectId, "project");
  // Map the result to the ProjectRevisionHistory structure
  return result.map((history) => ({
    date: history.date, // Assuming date is a Date object; otherwise, adjust as needed
    description: history.description || "",
    email: history.email,
  }));
};
