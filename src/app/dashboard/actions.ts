"use server";

import { createPayment } from "@/data-access/payment";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

const getEmailFromKinde = async (): Promise<string | null> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id)
    throw new Error("something went wrong with authentication" + user);

  return user.email;
};

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

// get all projects

// filter by project code
