"use server";

import {
  Payment,
  createPayment,
  getAllPayments,
  getTotalProjectCreditDebit,
} from "@/data-access/payment";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { formatCurrency } from "../../utils";
import { toInteger } from "lodash";

export type PaymentPresentationDTO = {
  id: number;
  amount: number;
  projectCode: string;
  category: "debit" | "credit" | "saldo";
  isEdited: boolean;
  isDeleted: boolean;
  description: string;
  date: Date;
  email: string;
};

export type Stats = {
  totalDebit: string;
  totalCredit: string;
};

export const getEmailFromKinde = async (): Promise<string | null> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id)
    throw new Error("something went wrong with authentication" + user);

  return user.email;
};

const mapToPresentationPayment = (data: Payment): PaymentPresentationDTO => ({
  id: data.id,
  amount: data.amount,
  projectCode: data.projectCode,
  category: data.category,
  isEdited: data.isEdited,
  isDeleted: data.isDeleted,
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

export const getPayments = async (
  companyId: string
): Promise<PaymentPresentationDTO[]> => {
  try {
    const payments = await getAllPayments(toInteger(companyId));

    return payments.map(mapToPresentationPayment);
  } catch (error) {
    console.error("Error adding new payment entry:", error);
    throw error;
  }
};

// get stats by project code
export const getStatsByProjectCode = async (
  code: string
): Promise<Stats | undefined> => {
  try {
    const result = await getTotalProjectCreditDebit(code);
    return {
      totalCredit: formatCurrency(result.totalCredit.toString()),
      totalDebit: formatCurrency(result.totalDebit.toString()),
    };
  } catch (error) {
    console.error("Error getting stats by project code:", error);
    throw error; // Rethrow the error for further handling
  }
};
