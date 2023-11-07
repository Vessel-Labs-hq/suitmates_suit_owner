import { Label } from "@the_human_cipher/components-library";
import Avatar from "../atoms/Avatar";
import {
  cn,
  dateFn,
  formatWord,
  getMaintenanceRequestPriorityType,
  getMaintenanceRequestStatusIcon,
  getMaintenanceRequestStatusType,
} from "@/utils";

const space = ["Space", "Category", "Priority", "Status", "Date"];

interface MaintenanceRequestTableProps {
  maintenanceRequests?: DbMaintenanceRequest[];
}

const MaintenanceRequestTable = (props: MaintenanceRequestTableProps) => {
  const { maintenanceRequests } = props;

  return (
    <div className="w-full py-4 md:rounded-2xl md:bg-light-gray">
      <div className="flex items-center justify-between gap-2 text-sm max-md:py-4 md:px-5 md:text-base">
        <p className="font-bold md:font-normal">Recent maintenance request</p>
        <button type="button" className="block underline md:hidden">
          View All
        </button>
      </div>
      <div className="mt-4 hidden grid-cols-5 border-b border-solid border-suite-dark px-5 pb-2 md:grid">
        {space.map((ele, idx) => (
          <div key={ele} className={cn("text-center text-xs", idx === 0 && "text-left")}>
            {ele}
          </div>
        ))}
      </div>
      <div className="max-md:space-y-3">
        {maintenanceRequests && maintenanceRequests.length > 0 ? (
          maintenanceRequests.map(
            ({ id, category, suite, user, status, priority, updated_at }) => {
              const date = dateFn(updated_at).format("DD/MM/YYYY");

              return (
                <div
                  key={id}
                  className="grid grid-cols-5 items-center gap-x-1 rounded-md bg-light-gray px-3 py-3 text-[11px] md:gap-x-2 md:rounded-none md:bg-transparent md:py-2 md:text-sm [&>*]:mx-auto"
                >
                  <div className="!ml-0 !mr-auto">
                    <div className="flex items-center gap-1 text-center md:items-center">
                      <Avatar
                        size={31}
                        src={user.avatar}
                        name={cn(user.first_name, user.last_name)}
                        className="h-6 max-h-6 w-6 max-w-6 text-[9px] text-xs max-xs:hidden md:h-8 md:max-h-8 md:w-8 md:max-w-8 md:text-xs"
                      />
                      <p className="font-bold max-md:text-[9px] md:font-medium">
                        {cn("Suite", suite.suite_number)}
                      </p>
                    </div>
                  </div>
                  <div>{category ?? "N/A"}</div>
                  <Label
                    label={priority}
                    dots
                    type={getMaintenanceRequestPriorityType(priority)}
                    small
                    className="capitalize max-md:h-4 max-md:px-1.5 max-md:text-[10px] md:text-xs"
                  />
                  <div className="w-fit">
                    <Label
                      label={formatWord(status.toLowerCase())}
                      icon={getMaintenanceRequestStatusIcon(status)}
                      type={getMaintenanceRequestStatusType(status)}
                      small
                      // show desktop
                      className="hidden whitespace-nowrap md:text-xs xxl:flex"
                    />
                    <Label
                      label={formatWord(status.toLowerCase())}
                      icon={getMaintenanceRequestStatusIcon(status)}
                      type={getMaintenanceRequestStatusType(status)}
                      small
                      // hide desktop
                      className="whitespace-nowrap px-1.5 text-[9px] max-md:h-5 sm:text-[10px] md:text-xs xxl:hidden"
                      iconSize={14}
                      figureClassName="max-sm:h-3 max-sm:w-3"
                    />
                  </div>
                  <div className="w-fit max-xs:text-[9px]">
                    <p className="">{date}</p>
                  </div>
                </div>
              );
            }
          )
        ) : (
          <div className="my-10 mt-14 text-center text-xs">
            You are yet to create any maintenance request
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceRequestTable;
