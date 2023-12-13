import { SidebarElement } from "@/components/atoms/HomeSharedUI";
import { FaviconLoader } from "@/components/atoms/Loader";
import NotificationUI from "@/components/molecules/Notifications/NotificationUI";
import { createAvatarUrl, getMaintenanceRequestStatusType } from "@/utils";
import { useGetAllMaintenance } from "@/utils/hooks/api/maintenance";
import { Title } from "@the_human_cipher/components-library";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

interface DueRequestSideBarProps {
  length?: number;
}

const DueRequestSideBar = (_: DueRequestSideBarProps) => {
  const { data, isLoading } = useGetAllMaintenance();

  const { maintenanceRequests } = data ?? {};

  if (isLoading) {
    return (
      <SidebarElement>
        <header className="mb-4 flex items-center justify-between gap-4">
          <Title level={4} weight="bold">
            Due Requests
          </Title>
          <p className="text-sm">See All</p>
        </header>
        <div className="grid min-h-[90px] place-items-center">
          <FaviconLoader />
        </div>
      </SidebarElement>
    );
  }

  return (
    <SidebarElement className="!pb-0">
      <header className="mb-4 flex items-center justify-between gap-4">
        <Title level={4} weight="bold">
          Due Requests
        </Title>
        <Link href="/maintenance-request" className="text-sm">
          See All
        </Link>
      </header>
      <ul className="hide-scrollbar grid h-[190px] grid-cols-1 gap-4 overflow-scroll pb-4">
        {maintenanceRequests && maintenanceRequests.length > 0 ? (
          [...maintenanceRequests]
            .reverse()
            .map(
              (
                { images, suite: { suite_number }, category, status, created_at },
                idx
              ) => {
                const img0 = images?.[0]?.url ?? createAvatarUrl(suite_number);

                return (
                  <li key={idx}>
                    <NotificationUI>
                      <NotificationUI.Content
                        title={category ?? `New requests for ${suite_number}`}
                        style={{ titleStyle: "text-sm whitespace-nowrap" }}
                        avatarProps={{ name: "Suite 14c", src: img0 }}
                      >
                        <div className="flex items-start gap-1">
                          <span className="tracking-tighter">
                            {dayjs(created_at).fromNow()}
                          </span>
                          <span className="text-suite-dark">•</span>
                          <span className="text-suite-dark">Suite {suite_number}</span>
                        </div>
                      </NotificationUI.Content>
                      <NotificationUI.Label
                        dots
                        type={getMaintenanceRequestStatusType(status)}
                        className="capitalize"
                      >
                        {status?.toLowerCase()}
                      </NotificationUI.Label>
                    </NotificationUI>
                  </li>
                );
              }
            )
        ) : (
          <div>aaa</div>
        )}
      </ul>
    </SidebarElement>
  );
};

export default DueRequestSideBar;
