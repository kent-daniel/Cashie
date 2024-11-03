"use server";

import { getPaymentsByProjectCode, Payment } from "@/data-access/payment";
import { fetchProjectByCode } from "@/data-access/projects";

export type PaymentRow = Omit<Payment, "amount"> & {
  debitAmount: number;
  creditAmount: number;
  remainingValue: number;
  remainingBudget: number;
};
export const toModelPaymentRow = (
  payment: Payment,
  projectValue: number,
  estimationBudget: number
): PaymentRow => {
  const debitAmount = payment.category === "debit" ? payment.amount : 0;
  const creditAmount = payment.category === "credit" ? payment.amount : 0;
  return {
    id: payment.id,
    projectCode: payment.projectCode,
    description: payment.description ?? "",
    category: payment.category as "debit" | "credit" | "saldo", // TODO: tidak ada saldo
    date: new Date(payment.date),
    email: payment.email,
    debitAmount: debitAmount,
    creditAmount: creditAmount,
    remainingValue: projectValue - debitAmount,
    remainingBudget: estimationBudget - creditAmount,
  };
};

export const fetchProjectPaymentRows = async (
  projectCode: string
): Promise<PaymentRow[]> => {
  console.log(`Fetching project payment rows for project code: ${projectCode}`);
  const projectRecords = await getPaymentsByProjectCode(projectCode);
  const { project } = await fetchProjectByCode(projectCode);

  if (project === undefined) {
    console.log(`Project with code ${projectCode} not found.`);
    return [];
  }
  const res = projectRecords.map((record) =>
    toModelPaymentRow(
      record,
      Number(project.projectValue),
      Number(project.estimationBudget)
    )
  );
  console.log(res);
  return res;
};
