
import Dashboard from "@/app/components/DashboardSubLayout/Dashboard";



export default function DashboardLayout({ children }) {
  return (
    <>
      <Dashboard>
        {children}
      </Dashboard>
    </>
  );
}