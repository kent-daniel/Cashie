"use server";
import { db } from "@/db/index";
import { payments } from "@/models/payment";
import { eq } from "drizzle-orm";

interface PaymentData {
  projectCode: string; // Required field
  amount: string; // Change from number to string to match DB type
  description?: string; // Optional
  category: string; // Required field
  date: Date | string; // Allow both Date and string here
  email: string; // Required field
}

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

// Create a new payment
export const createPayment = async (paymentData: PaymentData) => {
  const preparedData = toDomainPaymentData(paymentData);
  const result = await db.insert(payments).values(preparedData);
  return result;
};

// Get all payments
export const getAllPayments = async () => {
  const result = await db.select().from(payments);
  return result;
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
