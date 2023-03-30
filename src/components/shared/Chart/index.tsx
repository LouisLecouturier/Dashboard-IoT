import { Line } from "react-chartjs-2";
import { Chart as ChartJS, ChartData } from "chart.js/auto";

import styles from "./LineChart.module.scss";
import { FC } from "react";


type LineChartProps = {
    className?: string;
    chartData: ChartData<"line", number[], string>;
    min: number;
    max: number;

}

ChartJS.defaults.font.family = "Outfit";



const LineChart:FC<LineChartProps> = ({ chartData, min, max, className }) => {
  return (
    <article className={`${styles.chartContainer} ${className ?? ""}`}>
      <Line
        className={styles.chart}
        data={chartData}
        options={{
            maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
              labels: {
                font: {
                  family: "Outfit",
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
                color: "#FFFFFF",
              },
            },

            y: {
              beginAtZero: true,
              min,
              max,
            },
          },
        }}
      />
    </article>
  );
};

export default LineChart;
