import Icons from "@/assets/icons";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import HomeBento from "@/components/molecules/Cards/HomeBento";
import MaintenanceRequestCard from "@/components/molecules/Cards/MaintenanceRequestCard";
import MaintenanceRequestActionRow from "@/components/molecules/MaintenanceActionRow";
import { DummyMaintenanceData } from "@/constants";

const MaintenanceRequestPage = () => {
  return (
    <DashboardLayout>
      <main className="space-y-8 py-4">
        <div className="flex flex-col-reverse gap-4 lg:flex-row">
          <div className="grid w-full grid-cols-1 gap-4 xs:grid-cols-2">
            <HomeBento
              title="Total Requests"
              icon={Icons.Tool02Green}
              value={10}
              percentage="120%"
              className="rounded-xl md:rounded-2xl md:p-4"
            />
            <HomeBento
              title="Unresolved Requests "
              icon={Icons.Tool02Green}
              value="03"
              percentage="120%"
              className="rounded-xl md:rounded-2xl md:p-4"
            />
          </div>
          {/* <RentDueCard /> */}
        </div>
        <div className="space-y-4">
          <MaintenanceRequestActionRow />
          <div className="grid grid-cols-1 gap-6">
            {DummyMaintenanceData.map((ele, idx) => (
              <MaintenanceRequestCard
                href={{ pathname: `/maintenance-request/${idx}` }}
                {...ele}
                key={idx}
              />
            ))}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default MaintenanceRequestPage;
