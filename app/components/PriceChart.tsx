"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { Candle } from "../data/sampleSeries";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export function PriceChart({ candles }: { candles: Candle[] }) {
  const labels = candles.map((candle) => candle.date.slice(5));
  const data = {
    labels,
    datasets: [
      {
        label: "Penutupan",
        data: candles.map((candle) => candle.close),
        borderColor: "rgba(244, 186, 68, 0.9)",
        backgroundColor: "rgba(244, 186, 68, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        pointHitRadius: 10
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "rgba(226, 232, 240, 0.75)",
          maxRotation: 0,
          autoSkip: true
        },
        grid: {
          color: "rgba(148, 163, 184, 0.1)"
        }
      },
      y: {
        ticks: {
          color: "rgba(226, 232, 240, 0.75)"
        },
        grid: {
          color: "rgba(148, 163, 184, 0.08)"
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "#0f172a",
        borderColor: "rgba(244, 186, 68, 0.45)",
        borderWidth: 1,
        titleColor: "#f8fafc",
        bodyColor: "#e2e8f0"
      }
    }
  } as const;

  return (
    <div style={{ height: "280px", width: "100%" }}>
      <Line data={data} options={options} />
    </div>
  );
}
