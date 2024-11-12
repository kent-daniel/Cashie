"use server";

import { getPaymentsByProjectCode, Payment } from "@/data-access/payment";
import { fetchProjectByCode, ProjectDomain } from "@/data-access/projects";
import { mkConfig } from "export-to-csv";

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

    for (let i = 0; i < projectRecords.length; i++) {
      const payment = projectRecords[i];
      const debitAmount = payment.category === "debit" ? payment.amount : 0;
      const creditAmount = payment.category === "credit" ? payment.amount : 0;

      runningDebitTotal += debitAmount;
      runningCreditTotal += creditAmount;

      paymentRows.push({
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
): Promise<{ success: boolean; project?: ProjectDomain; message?: string }> => {
  try {
    // Call fetchProjectByCode to get the raw project data
    const result = await fetchProjectByCode(projectCode);

    if (!result.success || !result.project) {
      return { success: false, message: result.message };
    }

    // Map to ProjectDomain, converting date to string
    const projectDomain: ProjectDomain = {
      ...result.project,
      date: result.project.date.toString(), // or format as needed
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
