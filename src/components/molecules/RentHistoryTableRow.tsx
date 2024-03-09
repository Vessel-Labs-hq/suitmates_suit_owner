import { cn, formatNumberToCurrency } from "@/utils";
import { TrendIcon } from "../atoms/TrendIcon";
import { TableRow } from "../atoms/blocks";
import dayjs from "dayjs";
import { Label } from "@the_human_cipher/components-library";

interface RentHistoryTableRowProps {
  dateOfPayment: string;
  paid: boolean;
  suiteNumber: SN;
  status: string;
  amount: number;
}

export const RentHistoryTableRow = (props: RentHistoryTableRowProps) => {
  const { dateOfPayment, paid, suiteNumber, status, amount } = props;
  return (
    <TableRow
      key={dateOfPayment}
      className="grid-cols-3 items-center bg-[#F8F8FC] md:grid-cols-4"
    >
      <div className="mx-auto flex w-full items-center gap-2 max-md:mr-auto max-xs:text-sm md:relative md:w-full md:justify-center md:pl-6">
        <div className="left-0 md:absolute">
          <TrendIcon positive={paid} />
        </div>
        <p className="">Suite {suiteNumber}</p>
      </div>
      <div>
        <p
          className={cn(
            "font-bold max-xs:text-sm",
            !paid ? "text-borderNegative" : "text-primary"
          )}
        >
          {formatNumberToCurrency(amount, "USD")}
        </p>
        <p className="whitespace-nowrap text-[11px] md:hidden">
          {/* Jan 13, 2022 23:21 */}
          {dayjs(dateOfPayment).format("MMM D, YYYY h:mm A")}
        </p>
      </div>
      <p className="hidden whitespace-nowrap md:block">
        {dayjs(dateOfPayment).format("MMM D, YYYY h:mm A")}
      </p>
      <div className="ml-auto w-fit md:mx-auto">
        <Label
          className="h-8 px-4 capitalize max-sm:hidden md:text-base"
          type={!paid ? "danger" : "success"}
          label={status}
          dots
        />
        <Label
          className="h-8 max-w-fit px-4 capitalize max-sm:px-2 max-sm:py-1 sm:hidden md:text-base"
          type={!paid ? "danger" : "success"}
          label={status}
          dots
          small
        />
      </div>
    </TableRow>
  );
};
