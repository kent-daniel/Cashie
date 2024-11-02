// import { fetchCompanyById } from "../actions"; // Adjust the import based on your actions file
import { Company } from "../actions"; // Adjust the import based on your actions file
import { BackToDashboardButton } from "../components/BackToDashboardButton";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { companyId: string };
}) => {
  const company = "erkonindo";

  // get the companyId from url
  return (
    <div className="min-h-screen flex flex-col">
      {company && (
        <div className="text-white p-4 text-center flex  justify-between items-center w-2/3 mx-auto">
          <BackToDashboardButton />
          <h2 className="text-lg font-semibold">Perusahaan: {company}</h2>
        </div>
      )}
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default Layout;
