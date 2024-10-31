import Link from "next/link";
import { Book, BookCheck, BookUpIcon } from "lucide-react";

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen text-emerald-300 gap-8">
      <Link href="dashboard/buku-kecil" passHref className="min-h-fit">
        <button className="min-h-fit p-4 text-lg font-bold flex justify-center items-center gap-3 flex-col border border-emerald-900 rounded-lg hover:bg-emerald-950">
          <>
            <BookCheck size={64} />
            <span>Buku Kecil</span>
          </>
        </button>
      </Link>
      <Link href="dashboard/payment-entry" passHref className="min-h-fit">
        <button className="min-h-fit p-4 text-lg font-bold flex justify-center items-center gap-3 flex-col border border-emerald-900 rounded-lg hover:bg-emerald-950">
          <>
            <BookUpIcon size={64} />
            <span>Buku Besar</span>
          </>
        </button>
      </Link>
    </div>
  );
};

export default Page;
