
import Dashboard from "@/app/components/DashboardSubLayout/Dashboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function DashboardLayout({ children }) {
  return (
    <>
      <Dashboard>
        {children}
        <ToastContainer />
      </Dashboard>
    </>
  );
}