import React, { useEffect, useState } from "react";
import { useTable, Column } from "react-table";
import NotificationUI from "../Notifications/NotificationUI";
import { IconBox } from "@the_human_cipher/components-library";
import { useGetAllRentHistory } from "@/utils/hooks/api/rent-history";

type Row = { empty: string; from: string; amount: string; date: string; status: string };
const columns = [
  { Header: "", accessor: "empty" },
  { Header: "From", accessor: "from" },
  { Header: "Amount", accessor: "amount" },
  { Header: "Date", accessor: "date" },
  { Header: "Status", accessor: "status" },
] as Column<Row>[];

type RentDataRow = {
  empty: string;
  from: string;
  amount: string;
  date: string;
  status: string;
};

const RentHistoryTable = () => {
  const [rentData, setRentData] = useState<RentDataRow[]>([]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: rentData,
  });

  const { data: rentHistoryData, isLoading, isError } = useGetAllRentHistory();
  console.log("rent history", rentHistoryData);

  useEffect(() => {
    if (rentHistoryData && rentHistoryData.length > 0) {
      const resultData = rentHistoryData.map((item) => ({
        empty: "",
        from: `Suite ${item.suiteNumber}`,
        amount: `$${item.amount.toFixed(2)}`,
        date: new Date(item.dateOfPayment).toLocaleString(),
        status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
      }));

      setRentData(resultData);
    }
  }, [rentHistoryData]);

  return (
    <>
      <table {...getTableProps()} className="w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="rounded-t-sm border-b-2 bg-[#333333] p-4 text-center text-base font-medium text-white"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rentData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center">
                There are no rent history available.
              </td>
            </tr>
          ) : (
            rows
              .filter((row) => {
                return row.original.from !== "";
              })
              .map((row, index) => {
                prepareRow(row);
                const rentDataRow = rentData[index];

                return (
                  <tr
                    {...row.getRowProps()}
                    className={`border-b-8 border-white bg-[#F8F8FC] ${
                      index < rows.length - 1 ? "mb-4" : ""
                    }`}
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className={`bg-[#F8F8FC] p-4 text-center text-base font-bold ${
                          cell.column.Header === "Amount"
                            ? "text-[#3BAF75]"
                            : cell.column.Header === "From"
                            ? "text-base font-normal"
                            : cell.column.Header === "Date"
                            ? "text-base font-normal"
                            : ""
                        }`}
                      >
                        {cell.column.Header === "Status" ? (
                          <div className="flex items-center justify-center">
                            <NotificationUI.Label dots type="success">
                              {rentDataRow?.status}
                            </NotificationUI.Label>
                          </div>
                        ) : cell.column.Header === "" ? (
                          <div className="w-[40px] rounded-full bg-light-green text-primary">
                            <IconBox size={40} icon="ArrowNarrowDownLeft" />
                          </div>
                        ) : rentDataRow &&
                          (rentDataRow as any)[cell.column.id] !== undefined ? (
                          (rentDataRow as any)[cell.column.id]
                        ) : (
                          ""
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })
          )}
        </tbody>
      </table>
    </>
  );
};

export default RentHistoryTable;
