"use server";

import { getPaymentsByProjectCode, Payment } from "@/data-access/payment";
import { fetchProjectByCode } from "@/data-access/projects";

export type PaymentRow = Payment & {
  debitAmount: number;
  creditAmount: number;
  remainingValue: number;
  remainingBudget: number;
};

export const fetchProjectPaymentRows = async (
  projectCode: string
): Promise<PaymentRow[]> => {
  console.log(`Fetching project payment rows for project code: ${projectCode}`);

  try {
    // Fetch payments and project data - make sure to await both
    const projectData = await fetchProjectByCode(projectCode);
    const projectRecords: Payment[] = await getPaymentsByProjectCode(
      projectCode
    );

    // Add some debug logging
    console.log("Project Records:", projectRecords);
    console.log("Is Array?", Array.isArray(projectRecords));

    // Check if the project data exists
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
        remainingValue: projectValue - runningDebitTotal,
        remainingBudget: estimationBudget - runningCreditTotal,
        date: new Date(payment.date),
      });
    }

    console.log(paymentRows);
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
    debitAmount,
    creditAmount,
    remainingValue: 0,
    remainingBudget: 0,
  };
};
