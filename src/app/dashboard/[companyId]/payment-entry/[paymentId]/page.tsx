import { getPaymentDetails } from "./actions";

import { PaymentDetailCard } from "./components/PaymentDetailCard";

const Page = async ({ params }: { params: { paymentId: string } }) => {
  // Fetch payment by ID + history
  const paymentDetails = await getPaymentDetails(Number(params.paymentId!));

  return (
    <div className="p-8 space-y-8">
      {/* Payment Details Section */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700">
        <PaymentDetailCard
          paymentDetails={paymentDetails}
          paymentId={Number(params.paymentId!)}
        />
      </div>

      {/* History Section */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Riwayat Revisi
        </h2>
        <ul className="space-y-4">
          {paymentDetails.history && paymentDetails.history.length > 0 ? (
            paymentDetails.history.map((historyItem, index) => (
              <li
                key={index}
                className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-100 dark:border-zinc-700"
              >
                <p>
                  <strong className="font-medium text-zinc-700 dark:text-zinc-400">
                    Tanggal:
                  </strong>{" "}
                  {new Date(historyItem.date).toLocaleDateString("id-ID")}
                </p>
                <p>
                  <strong className="font-medium text-zinc-700 dark:text-zinc-400">
                    Oleh:
                  </strong>{" "}
                  {historyItem.email}
                </p>
                <p>
                  <strong className="font-medium text-zinc-700 dark:text-zinc-400">
                    Deskripsi:
                  </strong>{" "}
                  {historyItem.description || "Tidak ada deskripsi"}
                </p>
              </li>
            ))
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400">
              Tidak ada riwayat pencatatan.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Page;
