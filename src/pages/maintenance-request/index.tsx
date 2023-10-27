import Icons from "@/assets/icons";
import NotificationUI from "@/components/atoms/NotificationUI";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import HomeBento from "@/components/molecules/Cards/HomeBento";
import MaintenanceRequestCard from "@/components/molecules/Cards/MaintenanceRequestCard";
import MaintenanceRequestActionRow from "@/components/molecules/MaintenanceActionRow";
import { DummyMaintenanceData } from "@/constants";
import { Title } from "@the_human_cipher/components-library";

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
          <div className="flex items-start gap-4">
            <div className="grid w-full grid-cols-1 gap-6">
              {DummyMaintenanceData.map((ele, idx) => (
                <MaintenanceRequestCard
                  href={{ pathname: `/maintenance-request/${idx}` }}
                  {...ele}
                  key={idx}
                />
              ))}
            </div>
            <aside className="w-full rounded-2xl bg-light-gray p-3 max-xl:hidden xl:max-w-[350px] xl:p-6">
              <header className="flex items-center justify-between gap-4">
                <Title level={4} weight="bold" className="font-bold">
                  Recent History
                </Title>
                <p className="text-sm">See All</p>
              </header>
              <NotificationUI>
                <NotificationUI.Content
                  title="Water heater Issues"
                  style={{ titleStyle: "text-sm whitespace-nowrap" }}
                  avatarProps={{ name: "Suite 14c" }}
                >
                  <div className="flex items-center gap-1">
                    <span>2wks ago</span>
                    <span className="text-suite-dark">•</span>
                    <span className="text-suite-dark">Suite 12b</span>
                  </div>
                </NotificationUI.Content>
                <NotificationUI.Label dots type="danger">
                  Critical
                </NotificationUI.Label>
              </NotificationUI>
            </aside>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default MaintenanceRequestPage;
