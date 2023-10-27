import { IconBox, Title } from "@the_human_cipher/components-library";

const RentNotification = () => (
  <div className="grid grid-cols-3 gap-4 text-sm">
    <div className="space-y-1">
      <div className="flex items-center gap-1 text-xs">
        <div className="w-[15px] rounded-full bg-light-green text-primary">
          <IconBox size={14} icon="ArrowNarrowDownLeft" />
        </div>
        <span className="w-[calc(100%-15px)] whitespace-nowrap text-xs">Rent Payment</span>
      </div>
      <div>
        <Title level={5} weight="bold" className="leading-none text-primary">
          $3,000.56
        </Title>
      </div>
    </div>
    <div className="mx-auto flex w-fit flex-col">
      <div className="text-xs">From</div>
      <p className="mt-1">Suite 14C</p>
    </div>
    <div className="ml-auto flex flex-col text-[10px] leading-normal">
      <div className="">Jan 13, 2022</div>
      <p className="mt-1"> 12:21pm</p>
    </div>
  </div>
);

const RentHistorySidebar = () => (
  <div className="">
    <header className="flex items-center justify-between gap-4">
      <Title level={4} weight="bold">
        Recent History
      </Title>
      <p className="text-sm">See All</p>
    </header>
    <div className="mt-5 space-y-3">
      {[0, 1, 2, 3].map((n) => (
        <RentNotification key={n} />
      ))}
    </div>
  </div>
);

export default RentHistorySidebar;
