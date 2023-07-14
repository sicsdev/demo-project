
import Dashboard from "@/app/components/DashboardSubLayout/Dashboard";
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardLayout({ children }) {
  return (
    <>
      <Dashboard>
        {children}
      </Dashboard>
    </>
  );
}