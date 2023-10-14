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
import { Doughnut, Line } from "react-chartjs-2";

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

const doughnutData = {
  labels: ["Vacant Spaces", "Occupied Spaces"],
  datasets: [
    {
      label: "",
      data: [10, 12],
      backgroundColor: ["rgba(59, 175, 117, 1)", "rgba(240, 208, 190, 1)"],
      borderColor: ["rgba(59, 175, 117, 1)", "rgba(240, 208, 190, 1)"],
    },
  ],
};

type Options = ComponentProps<typeof Doughnut>["options"];

const defaultOption = (title: string): Options => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "bottom",
      align: "start",
    },
    title: {
      display: false,
      text: title,
    },
  },
});

export function DashboardSuiteInfoChart() {
  return <Doughnut data={doughnutData} options={defaultOption("Space Information")} />;
}

const lineData = {
  labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"],
  datasets: [
    {
      label: "Rent",
      data: [1000, 1400, 1300, 2001],
      borderColor: "rgb(255, 255, 255)",
    },
  ],
};

export function DashboardRentHistoryChart() {
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
      data={lineData}
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