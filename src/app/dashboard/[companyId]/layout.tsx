// import { fetchCompanyById } from "../actions"; // Adjust the import based on your actions file
import Link from "next/link";
import { getCompanyNameById } from "../actions"; // Adjust the import based on your actions file
import { BackToDashboardButton } from "../components/BackToDashboardButton";
import { Button } from "@/components/ui/button";
import { BookCheck, BookUpIcon } from "lucide-react";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { companyId: string };
}) => {
  const company = await getCompanyNameById(params.companyId);

  return (
    <div className="min-h-screen flex flex-col">
      {company && (
        <div className="text-white p-4 text-center flex  justify-evenly items-center w-full mx-auto bg-zinc-900 border border-b-zinc-800 ">
          <BackToDashboardButton />
          <Link href="payment-entry">
            <Button variant="secondary">
              Buku besar <BookUpIcon />
            </Button>
          </Link>
          <Link href="buku-posting">
            <Button variant="secondary">
              Buku posting <BookCheck />
            </Button>
          </Link>
          <h2 className="text-lg font-semibold">Perusahaan: {company}</h2>
        </div>
      )}
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default Layout;
