import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  registerables
} from "chart.js";
import { FormWrapper } from "./FormWrapper";
import "./secondStep.css"

export function SecondStep({ formData, setFormData }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    ...registerables
  );
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true, // Enable the tooltip
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y; // Get the y-axis value
            return `$${value}`; // Add a dollar sign and return the formatted label
          },
        },
      },

      title: {
        display: false, // Remove chart title
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          drawBorder: false,
          callback: (value) => `$${value}`, // Customize the y-axis label format
        },
      },
      x: {
        grid: {
          display: false, // Remove horizontal grid lines
        },
      },
    },
  };

  const labels = ['month 1', 'month 2', 'month 3']
  const data = {
    labels,
    datasets: [
      {
        borderWidth: 1,
        barPercentage: 0.5, // Adjust the width of bars
        categoryPercentage: 0.8, // Adjust the spacing between bars
        label: "",
        data: formData?.chartValues ?? [],
        backgroundColor: "#2563eb",
      },
    ],
  };
  return (
    <FormWrapper title="Save with Deflection AI">
      <div className="mb-4 mt-3 sm:mt-0 text-sm sm:text-base">
      Deflection AI enables you to elevate your customer experience capabilities while achieving substantial cost savings, including:
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="">
          <div className="shadow-md p-5 sm:p-0 flex flex-col w-[300px] h-[110px] mx-auto my-3 justify-center items-center">
            <span className="font-bold text-2xl text-[#142543]">

              ${formData?.AgentNumberAvg.toFixed(2) ?? 0}
            </span>
            <span className="text-[#7275a6]">Monthly Recurring Savings</span>
          </div>
          <div className="shadow-md p-5 sm:p-0 flex flex-col w-[300px] h-[110px] mx-auto my-3 justify-center items-center">
            <span className="font-bold text-2xl  text-[#142543]">
              ${formData?.dailyTicketVolumeAvg.toFixed(2) ?? 0}
            </span>
            <span className="text-[#7275a6]">Annual Recurring Savings</span>
          </div>
        </div>
        <div>  <div className="sm:w-[630px] sm:h-[291px] text-center m-auto shadow-md">
          <Bar data={data} options={options} />
        </div>
        </div>

      </div>
    </FormWrapper>
  );
}
