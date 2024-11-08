"use server";
import {
  getPaymentById,
  Payment,
  PaymentData,
  updatePayment,
} from "@/data-access/payment";
import { getEmailFromKinde, PaymentPresentationDTO } from "../actions";
import { addHistory, fetchHistory } from "@/data-access/history";
import { revalidatePath } from "next/cache";

interface PaymentDetails extends PaymentPresentationDTO {
  history: History[];
}

type History = {
  date: string;
  email: string;
  description: string;
};

export const getPaymentDetails = async (
  paymentId: number
): Promise<PaymentDetails> => {
  const payment = await getPaymentById(paymentId);
  const paymentHistory = await fetchHistory(paymentId, "payment");

  return {
    ...payment,
    description: payment.description || "",
    history: paymentHistory.map((history) => ({
      date: history.date,
      email: history.email,
      description: history.description || "", // Default to an empty string if description is undefined
    })),
  };
};

const getChanges = (original: Payment, updated: PaymentData): string[] => {
  const changes: string[] = [];

  if (original.projectCode !== updated.projectCode) {
    changes.push(
      `Kode Proyek diubah dari "${original.projectCode}" ke "${updated.projectCode}"`
    );
  }
  if (original.amount.toString() !== updated.amount) {
    changes.push(
      `Jumlah diubah dari "${original.amount}" ke "${updated.amount}"`
    );
  }
  if (original.category !== updated.category) {
    changes.push(
      `Kategori diubah dari "${original.category}" ke "${updated.category}"`
    );
  }
  if (original.description !== updated.description) {
    changes.push(
      `Deskripsi diubah dari "${original.description || "Tidak ada"}" ke "${
        updated.description || "Tidak ada"
      }"`
    );
  }
  if (original.email !== updated.email) {
    changes.push(
      `Pencatat diubah dari "${original.email}" ke "${updated.email}"`
    );
  }
  if (original.date.toISOString().split("T")[0] !== updated.date) {
    changes.push(
      `Tanggal diubah dari "${original.date.toLocaleDateString("id-ID")}" ke "${
        updated.date
      }"`
    );
  }

  return changes;
};

export const revisePaymentDetails = async (
  paymentId: number,
  paymentData: PaymentData
) => {
  // Fetch the original payment details
  const payment = await getPaymentById(paymentId);

  // Get the current user's email from Kinde
  const email = await getEmailFromKinde();
  if (!email) return;

  // Compare the original payment with the new paymentData to check for differences
  const changes = getChanges(payment, paymentData);

  // If no changes, return early
  if (changes.length === 0) {
    console.log("Tidak ada perubahan pada pembayaran.");
    return;
  }

  // Construct the history description
  const description = `Perubahan pada pembayaran: ${changes.join(", ")}`;
  // Add the change to history
  await addHistory(paymentId, "payment", description, email);
  // Update the payment details
  await updatePayment(payment.id, { ...paymentData, email: email });

  revalidatePath("/");
};
