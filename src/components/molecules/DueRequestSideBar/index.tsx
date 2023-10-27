import { SidebarElement } from "@/components/atoms/HomeSharedUI";
import NotificationUI from "@/components/atoms/NotificationUI";
import { DummyMaintenanceData } from "@/constants";
import { Title } from "@the_human_cipher/components-library";

interface DueRequestSideBarProps {
  length?: number;
}

const DueRequestSideBar = ({ length = 10 }: DueRequestSideBarProps) => (
  <SidebarElement>
    <header className="mb-4 flex items-center justify-between gap-4">
      <Title level={4} weight="bold">
        Due Requests
      </Title>
      <p className="text-sm">See All</p>
    </header>
    <ul className="grid grid-cols-1 gap-4">
      {[...DummyMaintenanceData, ...DummyMaintenanceData].slice(0, length).map((_, idx) => (
        <li key={idx}>
          <NotificationUI>
            <NotificationUI.Content
              title={`Water heater Issues (${idx + 1})`}
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
        </li>
      ))}
    </ul>
  </SidebarElement>
);

export default DueRequestSideBar;
