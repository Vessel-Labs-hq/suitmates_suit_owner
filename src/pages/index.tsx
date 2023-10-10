import DashboardLayout from "@/components/layouts/DashboardLayout";
import MaintenanceRequestTable from "@/components/molecules/MiantennanceRequestTable";

const HomePage = () => {
  return (
    <DashboardLayout>
      <MaintenanceRequestTable />
    </DashboardLayout>
  );
};

export default HomePage;
