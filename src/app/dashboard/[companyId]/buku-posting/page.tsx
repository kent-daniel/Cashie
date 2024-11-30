import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectListHeader from "./components/ProjectListHeader";
import { ProjectList } from "./components/ProjectList";
import { SearchBar } from "@/app/dashboard/[companyId]/buku-posting/components/search-bar";

const page = ({ params }: { params: { companyId: string } }) => {
  const { companyId } = params;
  return (
    <>
      <div className="mx-auto px-3 flex flex-col justify-center">
        <SearchBar />
        <ProjectListHeader companyId={companyId} />

        <ProjectList companyId={companyId} />
        <ToastContainer />
      </div>
    </>
  );
};

export default page;
