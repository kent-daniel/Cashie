import { fetchCompanies } from "./actions";
import { Dashboard } from "./components/Dashboard";

const Page = async () => {
  const companies = await fetchCompanies();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <Dashboard companies={companies} />
    </div>
  );
};

export default Page;
