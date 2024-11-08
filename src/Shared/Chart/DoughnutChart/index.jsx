import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data }) => {
  if (!data) return null;

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "FitNee Totalities",
      },
      legend: {
        position: "bottom",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="h-100">
      <div className="d-flex justify-content-center text-black-custom pt-4">
        <div style={{ width: "100%", height: "350px" }}>
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
