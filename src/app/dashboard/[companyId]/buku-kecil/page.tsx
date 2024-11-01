import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectListHeader from "./components/ProjectListHeader";
import { BackToDashboardButton } from "../../components/BackToDashboardButton";
import { ProjectList } from "./components/ProjectList";

const page = () => {
  return (
    <>
      <BackToDashboardButton />
      <div className="mx-auto w-1/2 flex flex-col justify-center">
        <ProjectListHeader />
        <ProjectList />
        <ToastContainer />
      </div>
    </>
  );
};

export default page;
