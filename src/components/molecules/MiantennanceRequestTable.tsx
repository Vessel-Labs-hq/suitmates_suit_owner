import { Label } from "@the_human_cipher/components-library";
import Avatar from "../atoms/Avatar";
import { cn } from "@/utils";

const space = ["Space", "Category", "Priority", "Status", "Date"];

const MaintenanceRequestTable = () => {
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
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className="grid grid-cols-5 items-center gap-x-2 rounded-md bg-light-gray px-3 py-3 text-[11px] md:rounded-none md:bg-transparent md:py-2 md:text-sm [&>*]:mx-auto"
          >
            <div className="!ml-0 !mr-auto">
              <div className="flex items-start gap-1 text-center md:items-center">
                <Avatar
                  size={31}
                  src="/temp/avatar.png"
                  name="Space 14C"
                  className="h-6 max-h-6 w-6 max-w-6 text-[9px] text-xs max-xs:hidden md:h-8 md:max-h-8 md:w-8 md:max-w-8 md:text-xs"
                />
                <p className="font-bold max-md:text-[9px]">Space 14c</p>
              </div>
            </div>
            <div>Plumbing</div>
            <Label
              label="Critical"
              dots
              type="danger"
              small
              className="text-xs max-md:h-4 max-md:px-1.5 max-md:text-[10px]"
            />
            <div className="w-fit">
              <Label
                label="Not Done"
                icon="XCircle"
                type="danger"
                small
                className="hidden text-xs xxl:flex"
              />
              <Label
                label="Pending"
                icon="XCircle"
                type="danger"
                small
                className="h-4 whitespace-nowrap px-1.5 text-xs max-md:text-[10px] xxl:hidden"
                iconSize={12}
              />
            </div>
            <div className="w-fit">
              <p className="">02/02/2024</p>
              {/* <p className="md:hidden">14th Mar, 23</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceRequestTable;
