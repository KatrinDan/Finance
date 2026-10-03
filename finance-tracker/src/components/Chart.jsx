import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import "./Chart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ income, expense }) => {
  console.log("Income:", income, "Expense:", expense);
  const data = {
    labels: ["Income","Expense"],
    datasets: [
      {
        data: [income, Math.abs(expense)],
        backgroundColor: [
          "#22c55e",
          "#ec4899",
        ],
        borderColor: [
          "#16a34a",
          "#db2777",
        ],
        borderWidth: 2,
      },
    ]
  };

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
     legend: {
      position: "top",
    },
  },
};

  return (
    <div className="chart-card">
      <h2>Financial Overview</h2>
      <div className="chart-wrapper">
        <Pie data={data} 
        options={options}/>
      </div>
    </div>
  );
};

export default Chart;