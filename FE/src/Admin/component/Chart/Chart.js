import React, { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import { useQuery } from "@tanstack/react-query";
import { getRevenue } from "../../../hook/LessionHook";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Doanh thu",
    },
  },
};

export function ChartBar({ value, type, date }) {
  const lb = useMemo(() => {
    let lbs = [];
    if (type === "year") {
      lbs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]?.map((z) => {
        return "Tháng " + z;
      });
    }
    if (type === "month") {
      lbs =
        value?.map((z) => {
          return `Ngày ${z?.time}`;
        }) || [];
    }
    return lbs;
  }, [type, value]);
  const labels =
    type === "year"
      ? [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ]
      : value?.map((z) => {
          return `Ngày ${z?.time}`;
        }) || [];
  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu (đơn vị: đồng)",
        // data: lb.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: value?.map((z) => z?.value) || [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      // {
      //   label: "Năm trước",
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };
  return <Bar options={options} data={data} />;
}
