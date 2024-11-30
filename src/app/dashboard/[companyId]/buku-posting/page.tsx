import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectListHeader from "./components/ProjectListHeader";
import { ProjectList } from "./components/ProjectList";
import { SearchBar } from "@/app/dashboard/[companyId]/buku-posting/components/search-bar";

const page = ({
  params,
  searchParams,
}: {
  params: { companyId: string };
  searchParams: { query?: string; filter?: string };
}) => {
  const { companyId } = params;
  const { query, filter } = searchParams;
  return (
    <>
      <div className="mx-auto px-3 flex flex-col justify-center">
        <SearchBar query={query || ""} filter={filter || ""} />
        <ProjectListHeader companyId={companyId} />
        <ProjectList
          companyId={companyId}
          query={query || ""}
          filter={filter || ""}
        />
        <ToastContainer />
      </div>
    </>
  );
};

export default page;
