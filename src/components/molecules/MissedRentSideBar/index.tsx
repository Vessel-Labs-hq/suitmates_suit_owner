import { SidebarElement } from "@/components/atoms/HomeSharedUI";
import NotificationUI from "@/components/molecules/Notifications/NotificationUI";
import { Title } from "@the_human_cipher/components-library";

interface DueRequestSideBarProps {
  length?: number;
}

const MissedRentSideBar = ({ length = 10 }: DueRequestSideBarProps) => (
  <SidebarElement>
    <header className="mb-4 flex items-center justify-between gap-4">
      <Title level={4} weight="bold">
        Missed Rents
      </Title>
      <p className="text-sm">See All</p>
    </header>
    <ul className="grid grid-cols-1 gap-4">
      {[0, 1, 2, 3, 4].slice(0, length).map((_, idx) => (
        <li key={idx}>
          <NotificationUI>
            <NotificationUI.Content
              title={`Suite 14C`}
              style={{ titleStyle: "text-sm whitespace-nowrap" }}
              avatarProps={{ name: "" }}
            >
              <div className="flex items-center gap-1">
                <span>$3,000.87</span>
              </div>
            </NotificationUI.Content>
            <NotificationUI.Label dots type="danger">
              3 days late
            </NotificationUI.Label>
          </NotificationUI>
        </li>
      ))}
    </ul>
  </SidebarElement>
);

export default MissedRentSideBar;
