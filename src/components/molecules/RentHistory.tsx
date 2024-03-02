import { Title } from "@the_human_cipher/components-library";
import Link from "next/link";
import { TrendIcon } from "../atoms/TrendIcon";
import dayjs from "dayjs";
import { FaviconLoader } from "../atoms/Loader";
import { formatNumberToCurrency } from "@/utils";

const RentNotification = (props: DbPaymentHistory) => {
  const { amount, dateOfPayment, paid, suiteNumber } = props;

  return (
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div className="space-y-1">
        <div className="flex items-center gap-1 text-xs">
          <TrendIcon positive={paid} className="h-5 w-full max-w-5 p-1" iconSize={12} />
          <span className="w-[calc(100%-15px)] whitespace-nowrap text-xs">Payment</span>
        </div>
        <div>
          <Title level={5} weight="bold" className="leading-none text-primary">
            {formatNumberToCurrency(amount, "USD")}
          </Title>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-xs">For</div>
        <p className="mt-1">Suite {suiteNumber}</p>
      </div>
      <div className="ml-auto flex flex-col text-[10px] leading-normal">
        <div className="">{dayjs(dateOfPayment).format("DD/MM/YYYY")}</div>
        <p className="mt-1">{dayjs(dateOfPayment).format("h:mm A")}</p>
      </div>
    </div>
  );
};

interface RentHistorySidebarProps {
  rentHistory: DbPaymentHistory[] | undefined;
  isFetching?: boolean;
}

const RentHistorySidebar = ({ rentHistory, isFetching }: RentHistorySidebarProps) => {
  if (isFetching) {
    return (
      <div className="grid h-full place-items-center">
        <FaviconLoader />
      </div>
    );
  }

  if (!rentHistory)
    return (
      <div className="grid h-full place-items-center text-center text-sm font-bold">
        You are yet to make a rent payment
      </div>
    );

  return (
    <div className="">
      <header className="flex items-center justify-between gap-4">
        <Title level={4}>Rent History</Title>
        <Link href="/rent-collection" className="text-sm">
          See All
        </Link>
      </header>
      <div className="mt-5 space-y-3">
        {rentHistory.map((rent) => (
          <RentNotification key={rent.dateOfPayment} {...rent} />
        ))}
      </div>
    </div>
  );
};

export default RentHistorySidebar;
