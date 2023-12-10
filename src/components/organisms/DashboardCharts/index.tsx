import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

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

dayjs.extend(customParseFormat);
const sortMonthlyRentDataset = (monthly: Record<string, number>) => {
  const unsortedKeys = Object.keys(monthly);
  const values = [];

  // sort the keys
  const sortedKeys = unsortedKeys.sort((a, b) => {
    const dateA = dayjs(a, "MM-YYYY");
    const dateB = dayjs(b, "MM-YYY");

    return dateA.toDate().getTime() - dateB.toDate().getTime();
  });

  // use the sortedKeys to retrieve the corresponding in the right order
  for (const key of sortedKeys) {
    const value = monthly[key];
    values.push(value);
  }

  const labels = sortedKeys.map((key) => {
    return dayjs(key, "MM YYYY").format("MMM YYYY");
  });

  return { labels, values };
};

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

  missedRentData.labels = labels;
  missedRentData.datasets[0].data = values;

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
        scales: {
          y: {
            ...scalesOption,
          },
          x: {
            ...scalesOption,
          },
        },
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
