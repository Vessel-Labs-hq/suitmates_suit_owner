import DashboardLayout from "@/components/layouts/DashboardLayout";
import MaintenanceRequestTable from "@/components/molecules/MiantennanceRequestTable";
import RentHistorySidebar from "@/components/molecules/RentHistory";

const HomePage = () => {
  return (
    <DashboardLayout>
      <div className="flex gap-4">
        <MaintenanceRequestTable />
        <aside className="w-full max-w-[365px] rounded-2xl bg-light-gray">
          <RentHistorySidebar />
        </aside>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
