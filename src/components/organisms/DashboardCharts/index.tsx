import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, type Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
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

export function DashboardDoughNutChart() {
  return <Doughnut data={data} options={defaultOption("Space Information")} />;
}
