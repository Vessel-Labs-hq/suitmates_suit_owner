import { Label } from "@the_human_cipher/components-library";
import Avatar from "../atoms/Avatar";
import { Fragment } from "react";
import { cn } from "@/utils";

const space = ["Space", "Category", "Priority", "Status", "Date"];

const MaintenanceRequestTable = () => {
  return (
    <div className="w-full rounded-2xl bg-light-gray py-4">
      <div className="px-5">Recent maintenance request </div>
      <div className="mt-4 grid grid-cols-5 border-b border-solid border-suite-dark px-5 pb-2">
        {space.map((ele, idx) => (
          <div key={ele} className={cn("text-center text-xs", idx === 0 && "text-left")}>
            {ele}
          </div>
        ))}
      </div>
      <div className="">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className="grid grid-cols-5 items-center gap-x-2 px-3 py-2 text-sm [&>*]:mx-auto"
          >
            <div className="!ml-0 !mr-auto">
              <div className="flex items-center gap-1 text-center">
                <Avatar
                  size={31}
                  src="/temp/avatar.png"
                  name="Space 14C"
                  className="h-7 w-7 text-xs md:h-[31px] md:w-[31px] md:text-xs"
                />
                <p>Space 14c</p>
              </div>
            </div>
            <div>Plumbing</div>
            <Label label="Critical" dots type="danger" small className="text-xs" />
            <Label label="Not Done" icon="XCircle" type="danger" small className="text-xs" />
            <p>02/02/2024</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceRequestTable;
