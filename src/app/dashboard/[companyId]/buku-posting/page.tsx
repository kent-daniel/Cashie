import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectListHeader from "./components/ProjectListHeader";
import { ProjectList } from "./components/ProjectList";

const page = ({ params }: { params: { companyId: string } }) => {
  const { companyId } = params;
  return (
    <>
      <div className="mx-auto w-1/2 flex flex-col justify-center">
        <ProjectListHeader companyId={companyId} />
        <ProjectList companyId={companyId} />
        <ToastContainer />
      </div>
    </>
  );
};

export default page;
