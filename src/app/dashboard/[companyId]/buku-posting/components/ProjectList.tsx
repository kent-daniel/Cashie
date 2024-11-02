import { fetchProjects, getProjectStatistics } from "../actions";
import { Project } from "@/data-access/projects";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

const ProjectCell = async ({
  project,
  companyId,
}: {
  project: Project;
  companyId: string;
}) => {
  const { totalCredit, totalDebit } = await getProjectStatistics(
    project.projectCode
  );

  return (
    <Card className="w-full mb-4 border border-zinc-700 bg-zinc-900 text-gray-100 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="p-4 rounded-t-lg flex justify-between items-center border-b border-zinc-700">
        <CardTitle className="text-lg font-semibold text-gray-50">
          {project.name}
        </CardTitle>
        <span className="text-md font-medium text-gray-400">
          #{project.projectCode}
        </span>
      </CardHeader>
      <CardContent className="p-4 space-y-2 text-sm text-gray-300">
        <div className="flex justify-between">
          <span className="font-medium text-gray-200">
            Tanggal mulai proyek :
          </span>
          <span className="text-gray-400">
            {project.date.toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-200">Nilai kontrak :</span>
          <span className="text-gray-400">{project.projectValue}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-200">RAB :</span>
          <span className="text-gray-400">{project.estimationBudget}</span>
        </div>

        <Separator className="my-2" />
        <div className="flex justify-between">
          <span className="font-medium text-red-400">Total biaya</span>
          <span className="text-red-400">{totalCredit}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-emerald-400">Total pembayaran</span>
          <span className="text-emerald-400">{totalDebit}</span>
        </div>
      </CardContent>
      <CardFooter className="">
        <Link href={`${project.projectCode}`} className="w-full my-2">
          <Button className="bg-emerald-700 hover:bg-emerald-600 text-white w-full">
            Lihat rincian <ArrowRightCircle />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export const ProjectList = async ({ companyId }: { companyId: string }) => {
  const projects = await fetchProjects(Number(companyId));
  return (
    <div className="p-6 space-y-4 min-h-screen">
      {projects?.map((project, index) => (
        <ProjectCell key={index} project={project} companyId={companyId} />
      ))}
    </div>
  );
};
