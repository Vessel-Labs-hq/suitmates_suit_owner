import React from "react";

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
import { Line } from "react-chartjs-2";
import { useGetRentChartHistory } from "@/utils/hooks/api/rent-history";
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

export function MissedRentHistoryChart() {
  const missedRentData = {
    labels: [""],
    datasets: [
      {
        label: "Rent",
        data: [0],
        borderColor: "#3BAF75",
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
      color: "#fffff",
    },
    ticks: {
      color: "#fffff",
    },
    grid: {
      display: true,
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
            display: true,
          },
          title: {
            display: true,
          },
        },
      }}
    />
  );
}
