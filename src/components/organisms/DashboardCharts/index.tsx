import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  CategoryScale,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useGetRentChartHistory } from "@/utils/hooks/api/rent-history";
import { useGetAllAnalyzedSpaceData } from "@/utils/hooks/api/useGetSpace";
import { sortMonthlyRentDataset } from "@/utils";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

type Options = ComponentProps<typeof Doughnut>["options"];

const defaultOption = (title: string): Options => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "bottom",
      align: "start",
      labels: {
        boxWidth: 20,
        textAlign: "left",
      },
    },
    title: {
      display: false,
      text: title,
    },
  },
});

export function DashboardSuiteInfoChart() {
  const { data: analyzedData } = useGetAllAnalyzedSpaceData();

  const doughnutData = {
    labels: ["Vacant Spaces", "Occupied Spaces"],
    datasets: [
      {
        label: "",
        data: [analyzedData?.totalVacantSuites, analyzedData?.totalOccupiedSuites],
        backgroundColor: ["rgba(59, 175, 117, 1)", "rgba(240, 208, 190, 1)"],
        borderColor: ["rgba(59, 175, 117, 1)", "rgba(240, 208, 190, 1)"],
      },
    ],
  };
  return <Doughnut data={doughnutData} options={defaultOption("Space Information")} />;
}

export function DashboardRentHistoryChart() {
  const missedRentData = {
    labels: [""],
    datasets: [
      {
        label: "Rent",
        data: [0],
        borderColor: "#fff",
        backgroundColor: "#3BAF75",
      },
    ],
  };
  const { data } = useGetRentChartHistory();

  if (!data?.monthly) {
    return;
  }

  const { monthly } = data;

  const { labels, values } = sortMonthlyRentDataset(monthly);

  missedRentData.labels = labels.reverse();
  missedRentData.datasets[0].data = values.reverse();

  const scalesOption = {
    beginAtZero: true,
    border: {
      color: "#fff",
    },
    ticks: {
      color: "#fff",
    },
    grid: {
      display: false,
    },
  };

  return (
    <Line
      data={missedRentData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { ...scalesOption }, x: { ...scalesOption } },
        line: {},
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
        },
      }}
    />
  );
}
