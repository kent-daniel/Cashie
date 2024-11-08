import { getPaymentById } from "@/data-access/payment";
import { PaymentPresentationDTO } from "../actions";
import { fetchHistory } from "@/data-access/history";

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
