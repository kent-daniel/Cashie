"use server";
import { PaymentPresentationDTO } from "@/app/dashboard/[companyId]/payment-entry/actions";
import { db } from "@/db/index";
import { payments, projects } from "@/models/schema";
import { eq, desc, sql } from "drizzle-orm";

export interface PaymentData {
  projectCode: string; // Required field
  amount: string;
  description?: string; // Optional
  category: string; // Required field
  date: Date | string; // Allow both Date and string here
  email: string; // Required field
}

export type Payment = {
  id: number;
  projectCode: string;
  amount: number;
  description?: string;
  category: "debit" | "credit" | "saldo";
  isEdited: boolean;
  isDeleted: boolean;
  date: Date;
  email: string;
};

// Helper function to convert date to string if necessary
const toDomainPaymentData = (paymentData: PaymentData) => {
  console.log("updating", paymentData);
  return {
    ...paymentData,
    date:
      typeof paymentData.date === "string"
        ? paymentData.date // Return the date as-is if it's already a string
        : paymentData.date.toISOString().split("T")[0], // Convert Date to string in 'YYYY-MM-DD' format
    amount: paymentData.amount.toString(), // Ensure amount is a string
  };
};

const toModelPayment = (payment: typeof payments.$inferSelect): Payment => {
  return {
    id: payment.id,
    projectCode: payment.projectCode,
    amount: parseFloat(payment.amount),
    description: payment.description ?? "",
    category: payment.category as "debit" | "credit" | "saldo",
    date: new Date(payment.date),
    isDeleted: payment.isDeleted,
    isEdited: payment.isEdited,
    email: payment.email,
  };
};

// Create a new payment
export const createPayment = async (paymentData: PaymentData) => {
  const preparedData = toDomainPaymentData({
    ...paymentData,
  });
  const result = await db.insert(payments).values(preparedData);
  return result;
};

// Get all payments
export const getAllPayments = async (companyId: number): Promise<Payment[]> => {
  const result = await db
    .select({
      id: payments.id,
      projectCode: payments.projectCode,
      amount: payments.amount,
      description: payments.description,
      category: payments.category,
      email: payments.email,
      isDeleted: payments.isDeleted,
      isEdited: payments.isEdited,
      date: payments.date, // Include additional fields as needed
    })
    .from(payments)
    .innerJoin(projects, eq(payments.projectCode, projects.projectCode))
    .where(eq(projects.companyId, companyId))
    .orderBy(desc(payments.id));

  return result.map(toModelPayment);
};

// Get all payments by project code
export const getPaymentsByProjectCode = async (
  projectCode: string
): Promise<Payment[]> => {
  const result = await db
    .select({
      id: payments.id,
      projectCode: payments.projectCode,
      amount: payments.amount,
      description: payments.description,
      category: payments.category,
      email: payments.email,
      isDeleted: payments.isDeleted,
      isEdited: payments.isEdited,
      date: payments.date, // Include additional fields as needed
    })
    .from(payments)
    .where(eq(payments.projectCode, projectCode))
    .orderBy(desc(payments.id));

  return result.map(toModelPayment);
};

// Get a payment by ID
export const getPaymentById = async (id: number): Promise<Payment> => {
  const result = await db.select().from(payments).where(eq(payments.id, id));
  return toModelPayment(result[0]);
};

// Update a payment by ID
export const updatePayment = async (id: number, paymentData: PaymentData) => {
  const result = await db
    .update(payments)
    .set({
      ...toDomainPaymentData(paymentData),
      isDeleted: false,
      isEdited: true,
    })
    .where(eq(payments.id, id)); // Use eq instead of equals
  return result;
};

// Delete a payment by ID
export const deletePayment = async (id: number) => {
  const result = await db.delete(payments).where(eq(payments.id, id)); // Use eq instead of equals
  return result;
};

// Get total credit and debit for a specific project code
export const getTotalProjectCreditDebit = async (projectCode: string) => {
  const result = await db
    .select({
      projectCode: payments.projectCode,
      totalCredit: sql`SUM(CASE WHEN category = 'credit' THEN amount ELSE 0 END)`, // Total for credit
      totalDebit: sql`SUM(CASE WHEN category = 'debit' THEN amount ELSE 0 END)`, // Total for debit
    })
    .from(payments)
    .where(eq(payments.projectCode, projectCode)) // Filter by projectCode
    .groupBy(payments.projectCode); // Group by projectCode

  if (result.length === 0) {
    return {
      totalCredit: 0,
      totalDebit: 0,
    };
  }

  return {
    totalCredit: parseFloat(result[0].totalCredit as string) || 0, // Convert to number and handle potential nulls
    totalDebit: parseFloat(result[0].totalDebit as string) || 0, // Convert to number and handle potential nulls
  };
};
