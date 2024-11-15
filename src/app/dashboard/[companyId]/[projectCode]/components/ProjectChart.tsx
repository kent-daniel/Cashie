"use client";

import { LabelList, Pie, PieChart } from "recharts";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getStatsByProjectCode } from "../../payment-entry/actions";
import { parseCurrency } from "@/app/dashboard/utils";
import { ProjectDomain } from "@/data-access/projects";

const chartConfig = {
  totalDebit: {
    label: "Total Pembayaran",
    color: "hsl(var(--chart-1))",
  },
  projectValue: {
    label: "Sisa nilai proyek",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ProjectChart({ project }: { project: ProjectDomain }) {
  const [chartData, setChartData] = useState<
    { label: string; value: number; fill: string }[]
  >([]);

  useEffect(() => {
    const getData = async (projectCode: string) => {
      const result = await getStatsByProjectCode(projectCode);
      if (result === undefined) return;
      const remainingValue =
        Number(project.projectValue) - Number(parseCurrency(result.totalDebit));
      setChartData([
        {
          label: chartConfig.totalDebit.label,
          value: parseCurrency(result.totalDebit),
          fill: chartConfig.totalDebit.color,
        },
        ...(remainingValue > 0
          ? [
              {
                label: chartConfig.projectValue.label,
                value: remainingValue,
                fill: chartConfig.projectValue.color,
              },
            ]
          : []),
      ]);
    };

    getData(project.projectCode);
  }, [project.projectCode, project.projectValue]);

  const getPercentage = (value: number) => {
    const total = chartData.reduce((sum, entry) => sum + entry.value, 0);
    return total
      ? ((value / Number(project.projectValue)) * 100).toFixed(1) + "%"
      : "";
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Project Financial Overview</CardTitle>
        <CardDescription>Nilai proyek vs. Total pembayaran</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="label" hideLabel />}
            />
            <Pie data={chartData} dataKey="value" nameKey="label">
              <LabelList
                dataKey="label"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: string) => {
                  const entry = chartData.find((d) => d.label === value);
                  return entry
                    ? `${value} ${getPercentage(entry.value)}`
                    : value;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
