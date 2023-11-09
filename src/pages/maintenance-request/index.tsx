import Icons from "@/assets/icons";
import { FaviconLoader } from "@/components/atoms/Loader";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import HomeBento from "@/components/molecules/Cards/HomeBento";
import MaintenanceRequestCard from "@/components/molecules/Cards/MaintenanceRequestCard";
import DueRequestSideBar from "@/components/molecules/DueRequestSideBar";
import MaintenanceRequestActionRow from "@/components/molecules/MaintenanceActionRow";
import { dateFn } from "@/utils";
import { useGetAllMaintenance } from "@/utils/hooks/api/maintenance";

const MaintenanceRequestPage = () => {
  const { data, isLoading, isError, error } = useGetAllMaintenance();

  if (isLoading) {
    return (
      <DashboardLayout headerDesc="Track maintenance on your dashboard ">
        <div className="grid h-[500px] place-items-center">
          <div>
            <FaviconLoader />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout headerDesc="Track maintenance on your dashboard ">
        <div>Oops an error occurred</div>
      </DashboardLayout>
    );
  }

  const unresolvedRequests = (data?.maintenanceRequests ?? []).filter(
    ({ status }) => status !== "COMPLETED"
  ).length;

  const totalRequests = data?.totalMaintenanceRequests ?? 0;

  const unresolvedRequestsPercent = (unresolvedRequests / totalRequests) * 100;

  const completedRequestsPercent =
    ((totalRequests - unresolvedRequests) / totalRequests) * 100;

  return (
    <DashboardLayout>
      <main className="space-y-8 py-4">
        <div className="flex flex-col-reverse gap-4 lg:flex-row">
          <div className="grid w-full max-w-xl grid-cols-1 gap-4 xs:grid-cols-2">
            <HomeBento
              title="Total Requests"
              icon={Icons.Tool02Green}
              value={totalRequests}
              percentage={`${completedRequestsPercent}%`}
              className="rounded-xl md:rounded-2xl md:p-4"
              text="completed"
              isDecline={completedRequestsPercent < 50}
            />
            <HomeBento
              title="Unresolved Requests "
              icon={Icons.Tool02Green}
              value={unresolvedRequests}
              percentage={`${unresolvedRequestsPercent}`}
              className="rounded-xl md:rounded-2xl md:p-4"
              text="unresolved"
              isDecline={unresolvedRequestsPercent > 50}
            />
          </div>
          {/* <RentDueCard /> */}
        </div>
        <div className="space-y-4">
          <MaintenanceRequestActionRow />
          <div className="flex items-start gap-4">
            <div className="grid w-full grid-cols-1 gap-6">
              {data && data.maintenanceRequests.length > 0 ? (
                data?.maintenanceRequests.map(
                  (
                    {
                      id,
                      updated_at,
                      description,
                      status,
                      priority,
                      images,
                      category,
                      user,
                      suite,
                    },
                    idx
                  ) => (
                    <MaintenanceRequestCard
                      key={id}
                      href={{
                        pathname: `/maintenance-request/${id}`,
                      }}
                      title={category ?? "N/A"}
                      img={images.map(({ url }) => url)}
                      label={priority.toLowerCase() as any}
                      status={status as any}
                      desc={description}
                      date={dateFn(updated_at).format("DD MMM YYYY")}
                      user={user}
                      suite={`Suite ${suite.suite_number}`}
                    />
                  )
                )
              ) : (
                <div className="my-20 text-center text-xs">
                  You are yet to receive any maintenance request
                </div>
              )}
            </div>
            <DueRequestSideBar />
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default MaintenanceRequestPage;
