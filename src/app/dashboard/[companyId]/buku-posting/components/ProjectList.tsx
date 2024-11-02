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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { parseCurrency } from "@/app/dashboard/utils";

const ProjectCell = async ({ project }: { project: Project }) => {
  const { totalCredit, totalDebit } = await getProjectStatistics(
    project.projectCode
  );

  return (
    <Card className="w-full border border-zinc-700 bg-zinc-900 text-gray-100 shadow-lg rounded-lg">
      <CardHeader className="p-4 rounded-t-lg border-b border-zinc-700">
        <CardTitle className="text-lg font-semibold text-gray-50 flex items-center relative justify-between w-full">
          {project.name}
          {parseCurrency(totalCredit) >
            parseCurrency(project.estimationBudget) && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="mr-3 flex items-center relative cursor-pointer">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-8 w-8 bg-yellow-400 items-center justify-center">
                      <span className="text-[24px] leading-none text-orange-700">
                        ⚠️
                      </span>
                    </span>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Biaya melebihi RAB</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
        <span className="text-md font-medium text-gray-400 text-left">
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
    <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-3">
      {projects?.map((project, index) => (
        <ProjectCell key={index} project={project} />
      ))}
    </div>
  );
};
