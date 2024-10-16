"use server";

import { createPayment, getAllPayments } from "@/data-access/payment";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { Payment } from "./data-table";

const getEmailFromKinde = async (): Promise<string | null> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id)
    throw new Error("something went wrong with authentication" + user);

  return user.email;
};

const mapToPresentationPayment = (data: {
  amount: string;
  projectCode: string;
  category: string;
  description: string | null;
  date: string;
  id: number;
  email: string;
}): Payment => ({
  amount: parseFloat(data.amount), // Convert amount from string to number
  projectCode: data.projectCode,
  category: data.category as "debit" | "credit", // Ensure category is of the right type
  description: data.description as string,
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
    revalidatePath("/");
  } catch (error) {
    console.error("Error adding new payment entry:", error);
    throw error;
  }
};

export const getPayments = async (): Promise<Payment[]> => {
  try {
    const email = await getEmailFromKinde();
    if (!email) {
      throw new Error("User email not found");
    }

    const payments = await getAllPayments();

    return payments.map(mapToPresentationPayment);
  } catch (error) {
    console.error("Error adding new payment entry:", error);
    throw error;
  }
};

// filter by project code
