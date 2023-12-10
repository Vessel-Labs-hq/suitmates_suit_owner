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
import { Line } from "react-chartjs-2";
import { useGetRentChartHistory } from "@/utils/hooks/api/rent-history";

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

  missedRentData.labels = labels;
  missedRentData.datasets[0].data = values;

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
