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

export function ThirdStep({ email, password, updateFields }) {
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
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cost Reduction Benefits over 3 Years',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1,2,3,5,6,5],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  return (
    <FormWrapper title="Simplify and save with 8X8">
      <div className="mb-4 mt-3 sm:mt-0 text-sm sm:text-base">
        8x8 can help you to advance your Unified Communications solutions, delivering significant savings inclding:
      </div>
      <div className="h-auto sm:h-[50vh] grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="grid grid-rows-1 sm:grid-rows-3 gap-8">
          <div className="shadow-md p-5 sm:p-0 flex flex-col justify-center items-center">
            <div className="font-bold text-2xl ">$0</div>
            <div className="text-[#7275a6]">Upfront/ One-time Savings</div>
          </div>
          <div className="shadow-md p-5 sm:p-0 flex flex-col justify-center items-center">
            <span className="font-bold text-2xl text-[#142543]">
              -$88888888
            </span>
            <span className="text-[#7275a6]">Monthly Recurring savings</span>
          </div>
          <div className="shadow-md p-5 sm:p-0 flex flex-col justify-center items-center">
            <span className="font-bold text-2xl  text-[#142543]">
              -$88888888
            </span>
            <span className="text-[#7275a6]">Annually Recurring savings</span>
          </div>
        </div>
        <div className="grid grid-rows-1">
          <div className="shadow-md ">
            <Bar data={data} options={options} className="!h-full !w-full" height={100} width={100} />
          </div>
        </div>
        <div className="grid grid-rows-3 gap-8">
          <div className="shadow-md p-5 sm:p-0 flex flex-col justify-center items-center">
            <div className="font-bold text-2xl ">&gt; 36 months</div>
            <div className="text-[#7275a6]">Payback period</div>
          </div>
          <div className="shadow-md p-5 sm:p-0  flex flex-col justify-center items-center">
            <span className="font-bold text-2xl text-[#142543]">
              -100%
            </span>
            <span className="text-[#7275a6]">ROI</span>
          </div>
          <div className="shadow-md p-5 sm:p-0  flex flex-col justify-center items-center">
            <span className="font-bold text-2xl  text-[#142543]">
              -$100343
            </span>
            <span className="text-[#7275a6]">NPV (over 3 years)</span>
          </div>
        </div>
        <div className="grid grid-rows-1">
          <div className="shadow-md ">
            <Line options={options} data={data} className="!h-full !w-full" height={100} width={100}/>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
