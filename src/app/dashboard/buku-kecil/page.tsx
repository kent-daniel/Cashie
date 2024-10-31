import { Separator } from "@/components/ui/separator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectListHeader from "./components/ProjectListHeader";
import { BackToDashboardButton } from "../components/BackToDashboardButton";

const page = () => {
  return (
    <>
      <BackToDashboardButton />
      <div className="mx-auto w-1/2 flex flex-col justify-center">
        <div className="flex justify-between p-3 mt-7">
          <ProjectListHeader />
        </div>
        <Separator className="bg-emerald-800" />
        <ToastContainer />
      </div>
    </>
  );
};

export default page;
