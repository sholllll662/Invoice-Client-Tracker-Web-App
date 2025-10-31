// components/RevenueChart.jsx
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const RevenueChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Pendapatan",
        data: data.map((item) => item.total),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
    },
  };

  return (
    <div className="p-6 border border-2 border-amber-500 rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-2">Grafik Pendapatan Bulanan</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;
