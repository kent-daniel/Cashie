"use server";
import { db } from "@/db/index";
import { payments } from "@/models/payment";
import { eq, desc } from "drizzle-orm";

interface PaymentData {
  projectCode: string; // Required field
  amount: string;
  description?: string; // Optional
  category: string; // Required field
  date: Date | string; // Allow both Date and string here
  email: string; // Required field
}

export type Payment = {
  projectCode: string;
  amount: number;
  description?: string;
  category: "debit" | "credit" | "saldo";
  date: Date;
  email: string;
};

// Helper function to convert date to string if necessary
const toDomainPaymentData = (paymentData: PaymentData) => {
  return {
    ...paymentData,
    date:
      typeof paymentData.date === "string"
        ? paymentData.date // Return the date as-is if it's already a string
        : paymentData.date.toISOString().split("T")[0], // Convert Date to string in 'YYYY-MM-DD' format
    amount: paymentData.amount.toString(), // Ensure amount is a string
  };
};

const toModelPayment = (payment: any): Payment => {
  return {
    projectCode: payment.projectCode,
    amount: parseFloat(payment.amount),
    description: payment.description ?? "",
    category: payment.category as "debit" | "credit" | "saldo",
    date: new Date(payment.date),
    email: payment.email,
  };
};
// Create a new payment
export const createPayment = async (paymentData: PaymentData) => {
  const preparedData = toDomainPaymentData(paymentData);
  const result = await db.insert(payments).values(preparedData);
  return result;
};

// Get all payments
export const getAllPayments = async (): Promise<Payment[]> => {
  const result = await db.select().from(payments).orderBy(desc(payments.id));
  return result.map(toModelPayment); // Map to model format
};

// Get a payment by ID
export const getPaymentById = async (id: number) => {
  const result = await db.select().from(payments).where(eq(payments.id, id)); // Use eq instead of equals
  return result;
};

// Update a payment by ID
export const updatePayment = async (id: number, paymentData: PaymentData) => {
  const preparedData = toDomainPaymentData(paymentData);
  const result = await db
    .update(payments)
    .set(preparedData)
    .where(eq(payments.id, id)); // Use eq instead of equals
  return result;
};

// Delete a payment by ID
export const deletePayment = async (id: number) => {
  const result = await db.delete(payments).where(eq(payments.id, id)); // Use eq instead of equals
  return result;
};

// get unique project codes
export const getUniqueProjectCodes = async () => {
  const result = await db
    .select({
      projectCode: payments.projectCode,
    })
    .from(payments)
    .groupBy(payments.projectCode); // Group by projectCode to ensure uniqueness

  return result.map((payment) => payment.projectCode);
};
