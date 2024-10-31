"use server";

import {
  Payment,
  createPayment,
  getAllPayments,
  getTotalProjectCreditDebit,
  getUniqueProjectCodes,
} from "@/data-access/payment";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { formatCurrency } from "../../utils";

export type PaymentPresentationDTO = {
  amount: number;
  projectCode: string;
  category: "debit" | "credit" | "saldo awal";
  description: string;
  date: Date;
  email: string;
};

export type Stats = {
  totalDebit: string;
  totalCredit: string;
};

const getEmailFromKinde = async (): Promise<string | null> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id)
    throw new Error("something went wrong with authentication" + user);

  return user.email;
};

const mapToPresentationPayment = (data: Payment): PaymentPresentationDTO => ({
  amount: data.amount,
  projectCode: data.projectCode,
  category:
    data.category === "saldo"
      ? "saldo awal"
      : (data.category as "debit" | "credit"),
  description: data.description ?? "", // Default to empty string if null
  date: new Date(data.date),
  email: data.email,
});

export const addNewPaymentEntry = async ({
  amount,
  projectCode,
  category,
  description,
}: {
  amount: string;
  projectCode: string;
  category: string;
  description?: string;
}): Promise<void> => {
  try {
    const email = await getEmailFromKinde();
    if (!email) {
      throw new Error("User email not found");
    }

    const paymentData = {
      amount,
      projectCode,
      category,
      description,
      email,
      date: new Date(),
    };

    await createPayment(paymentData);
    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Error adding new payment entry:", error);
    throw error;
  }
};

export const getPayments = async (): Promise<PaymentPresentationDTO[]> => {
  try {
    const payments = await getAllPayments();

    return payments.map(mapToPresentationPayment);
  } catch (error) {
    console.error("Error adding new payment entry:", error);
    throw error;
  }
};

// get stats by project code
export const getStatsByProjectCode = async (
  id: string
): Promise<Stats | undefined> => {
  try {
    const uniqueProjectCodes = await getUniqueProjectCodes();

    if (!uniqueProjectCodes.includes(id)) {
      console.warn(`Project code ${id} not found in unique project codes.`);
      return;
    }

    const result = await getTotalProjectCreditDebit(id);
    return {
      totalCredit: formatCurrency(result.totalCredit.toString()),
      totalDebit: formatCurrency(result.totalDebit.toString()),
    };
  } catch (error) {
    console.error("Error getting stats by project code:", error);
    throw error; // Rethrow the error for further handling
  }
};
